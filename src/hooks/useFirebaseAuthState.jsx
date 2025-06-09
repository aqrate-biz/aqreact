import React from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useFirebaseAuth } from "./useFirebaseAuth";

function check(auth) {
    if (!auth) {
        throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
    }

}

export function useFirebaseAuthState() {
    const auth = useFirebaseAuth();
    
    return {
        setStateChangeCallback: (callback) => {
            check(auth);
            onAuthStateChanged(auth, callback);
        },
        getCurrentUser: () => {
            check(auth);
            const user = auth.currentUser;
            if (!user) {
                console.log("No user is currently signed in.");
                return null;
            }
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified
            };
        },
        getToken: async () => {
            check(auth);
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in.");
            }
            try {
                const token = await user.getIdToken();
                return token;
            } catch (error) {
                console.error("Error getting token:", error);
                throw error;
            }
        }
    };
}