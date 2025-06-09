import React from "react";
import { signInAnonymously } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";

export function useFirebaseAnonymousAuth() {
    const auth = useFirebaseAuth();
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
                        console.log("Anonymous user signed in successfully:", user);
                        resolve(user);
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error("Error signing in anonymously:", errorCode, errorMessage);
                        reject(error);
                    });
            });
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