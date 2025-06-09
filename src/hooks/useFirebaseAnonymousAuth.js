import React from "react";
import { signInAnonymously } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";

export function useFirebaseAnonymousAuth() {
    const auth = useFirebaseAuth();
    if (!auth) {
        throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
    }
    return {
        signIn: () => {
            signInAnonymously(auth)
                .then((result) => {
                    console.log("Anonymous user signed in successfully.");
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },
        signOut: () => {
            auth.signOut()
                .then(() => {
                    console.log("Anonymous user signed out successfully.");
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    };
    
}