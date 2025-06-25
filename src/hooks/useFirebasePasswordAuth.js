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
import { useLogger } from "./useLogger";

function checkUser(user) {
    if (!user) {
        throw new Error("No user is currently signed in.");
    }
}

export function useFirebasePasswordAuth(scopes, language) {
    const auth = useFirebaseAuth();
    const logger = useLogger('FirebasePasswordAuth');
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
                    logger.info("User signed up successfully:", userCredential);
                    const user = userCredential.user;
                    resolve(user)
                } catch (error) {
                    logger.error("Error signing up:", error);
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
                        logger.info("User signed in successfully:", userCredential);
                        resolve(userCredential.user);
                    })
                    .catch((error) => {
                        logger.error("Error signing in:", error);
                        reject(error)
                    });
                })
        },
        signOut: async () => {
            return new Promise((resolve, reject) => {
                auth.signOut().then(() => {
                    logger.info("User signed out successfully.");
                    resolve(true);
                }).catch((error) => {
                    logger.error("Error signing out:", error);
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
                    logger.debug("Email verification sent successfully.");
                    resolve(true);
                }).catch((error) => {
                    logger.error("Error sending email verification:", error);
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
                    logger.info("Password updated successfully.");
                    resolve(true);
                }).catch((error) => {
                    logger.error("Error updating password:", error);
                    reject(error);
                });
            })
        },
        sendPasswordResetEmail: async (email) => {
            return new Promise(async (resolve, reject) => {
                return sendPasswordResetEmail(auth, email).then(() => {
                    logger.debug("Password reset email sent successfully.");
                    resolve(true);
                }).catch((error) => {
                    logger.error("Error sending password reset email:", error);
                    reject(error);
                });
            })
        },
    };
    
}