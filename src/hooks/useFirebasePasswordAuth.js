import React, { use } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    validatePassword,
    sendEmailVerification,
    updatePassword,
    sendPasswordResetEmail
} from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useFirebaseAuthState } from "./useFirebaseAuthState";

function checkUser(user) {
    if (!user) {
        throw new Error("No user is currently signed in.");
    }
}

export function useFirebasePasswordAuth(scopes, language) {
    const auth = useFirebaseAuth();
    if (!auth) {
        throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
    }
    const authState = useFirebaseAuthState();
    
    return {
        signUp: async (email, password) => {
            return new Promise(async (resolve, reject) => {
                if (!email || !password) {
                    reject(new Error("Email and password are required for sign up."));
                }
                const isValid = await validatePassword(auth, password);
                if (!isValid) {
                    reject(new Error("Password does not meet the security requirements."));
                }
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    // Signed in
                    const user = userCredential.user;
                    resolve(user)
                } catch (error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject(new Error(`Error signing up: ${errorMessage}`));
                }
            })
        },
        signIn: async (email, password) => {
            return new Promise(async (resolve, reject) => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        resolve(userCredential.user);
                    })
                    .catch((error) => {
                        reject(error)
                    });
                })
        },
        signOut: async () => {
            return new Promise((resolve, reject) => {
                auth.signOut().then(() => {
                    console.log("User signed out successfully.");
                    resolve(true);
                }).catch((error) => {
                    console.error("Error signing out:", error);
                    reject(error);
                });
            });
        },
        sendEmailVerification: async (language) => {
            return new Promise((resolve, reject) => {
                const user = authState.getCurrentUser();
                checkUser(user);
                if (language) {
                    auth.languageCode = language;
                }
                return sendEmailVerification(user).then(() => {
                    console.log("Email verification sent successfully.");
                    resolve(true);
                }).catch((error) => {
                    console.error("Error sending email verification:", error);
                    reject(error);
                });
            })
        },
        updatePassword: async (newPassword) => {
            return new Promise(async (resolve, reject) => {
                const user = authState.getCurrentUser();
                checkUser(user);
                const isValid = await validatePassword(auth, newPassword);
                if (!isValid) {
                    reject(new Error("Password does not meet the security requirements."));
                }
                return updatePassword(user, newPassword).then(() => {
                    console.log("Password updated successfully.");
                    resolve(true);
                }).catch((error) => {
                    console.error("Error updating password:", error);
                    reject(error);
                });
            })
        },
        sendPasswordResetEmail: async () => {
            return new Promise((resolve, reject) => {
                const user = authState.getCurrentUser();
                checkUser(user);
                return sendPasswordResetEmail(auth, user.email).then(() => {
                    console.log("Password reset email sent successfully.");
                    resolve(true);
                }).catch((error) => {
                    console.error("Error sending password reset email:", error);
                    reject(error);
                });
            })
        },
    };
    
}