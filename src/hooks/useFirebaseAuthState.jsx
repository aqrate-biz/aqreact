import React from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useFirebaseAuth } from "./useFirebaseAuth";

export function useFirebaseAuthState() {
    const auth = useFirebaseAuth();
    
    return {
        setStateChangeCallback: (callback) => {
            if (!auth) {
                throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
            }
            onAuthStateChanged(auth, callback);
        }
    };
}