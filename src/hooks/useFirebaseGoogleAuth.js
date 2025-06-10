import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useLogger } from "./useLogger";

export function useFirebaseGoogleAuth(scopes, language) {
    const auth = useFirebaseAuth();
    const logger = useLogger('FirebaseGoogleAuth');
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
                        logger.debug("Google credential", credential);
                        // The signed-in user info.
                        const user = result.user;
                        logger.info("Google user signed in successfully:", user);
                        resolve(user);
                    })
                    .catch((error) => {
                        logger.error("Error signing in with Google:", error);
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
                    logger.info("User signed out successfully.");
                    resolve(true);
                }).catch((error) => {
                    logger.error("Error signing out:", error);
                    reject(error);
                });
            });
        }
    };
    
}