import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";

export function useFirebaseGoogleAuth(scopes, language) {
    const auth = useFirebaseAuth();
    if (!auth) {
        throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
    }
    const provider = new GoogleAuthProvider();
    if (scopes && Array.isArray(scopes)) {
        scopes.forEach(scope => {
            provider.addScope(scope);
        });
    }
    if (language) {
        auth.languageCode = language;
    }
    return {
        signIn:async () => {
            return new Promise((resolve, reject) => {
                signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const user = result.user;
                        resolve(user);
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
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
        }
    };
    
}