import React from "react";
import { signInAnonymously } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useLogger } from "./useLogger";

export function useFirebaseAnonymousAuth() {
    const auth = useFirebaseAuth();
    const logger = useLogger('FirebaseAnonymousAuth');
    if (!auth) {
        throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
    }
    return {
        signIn: async () => {
            return new Promise((resolve, reject) => {
                signInAnonymously(auth)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        logger.info("Anonymous user signed in successfully:", user);
                        resolve(user);
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        logger.error("Error signing in anonymously:", errorCode, errorMessage);
                        reject(error);
                    });
            });
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