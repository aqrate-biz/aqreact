import React from "react";
import { onAuthStateChanged, reauthenticateWithCredential } from "firebase/auth";

import { useFirebaseAuth } from "./useFirebaseAuth";
import { useLogger } from "./useLogger";

function check(auth) {
    if (!auth) {
        throw new Error("Firebase auth is not initialized. Please ensure Firebase app is initialized.");
    }
}
function checkUser(user) {
    if (!user) {
        throw new Error("No user is currently signed in.");
    }
}

export function useFirebaseAuthState() {
    const auth = useFirebaseAuth();
    const logger = useLogger('FirebaseAuthState');
    
    return {
        setStateChangeCallback: (callback) => {
            check(auth);
            logger.info("Setting auth state change callback");
            onAuthStateChanged(auth, callback);
        },
        getCurrentUser: () => {
            check(auth);
            const user = auth.currentUser;
            logger.debug("Current user:", user);
            if (!user) {
                return {}
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
            checkUser(user);
            try {
                const token = await user.getIdToken();
                logger.debug("User token:", token);
                return token;
            } catch (error) {
                logger.error("Error getting token:", error);
                throw error;
            }
        },
        reauthenticate: async (credential) => {
            check(auth);
            const user = auth.currentUser;
            checkUser(user);
            try {
                await reauthenticateWithCredential(user, credential);
                logger.debug("User reauthenticated successfully.");
                return true;
            } catch (error) {
                logger.error("Error reauthenticating user:", error);
                throw error;
            }
        }
    };
}