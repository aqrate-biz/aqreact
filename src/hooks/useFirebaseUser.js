import React from "react";

import { 
    updateProfile,
    deleteUser
} from "firebase/auth"

import { useFirebaseAuth } from "./useFirebaseAuth";
import { useFirebaseAuthState } from "./useFirebaseAuthState";
import { useLogger } from "./useLogger";

function checkUser(user) {
    if (!user) {
        throw new Error("No user is currently signed in.");
    }
}


export function useFirebaseUser() {
    const auth = useFirebaseAuth();
    const authState = useFirebaseAuthState();
    const logger = useLogger('FirebaseUser');

    if (!auth) {
        throw new Error("useFirebaseUser must be used within a FirebaseProvider");
    }

    if (!authState) {
        throw new Error("useFirebaseUser must be used within a FirebaseAuthStateProvider");
    }

    return { 
        getProvidersData: () => {
            const user = authState.getCurrentUser()
            checkUser(user);
            logger.debug("Providers data for user:", user);
            return user.providerData.reduce((acc, provider) => {
                acc[provider.providerId] = provider;
                return acc;
            }, {});
        },
        updateProfile: async (profile) => {
            return new Promise((resolve, reject) => {
                const user = authState.getCurrentUser();
                checkUser(user);
                updateProfile(auth, {
                    displayName: profile.displayName || user.displayName,
                    photoURL: profile.photoURL || user.photoURL
                }).then(() => {
                    logger.info("Profile updated successfully.", profile);
                    resolve(true)
                }).catch((error) => {
                    logger.error("Error updating profile:", error);
                    reject(error);
                });
            })
        },
        
        deleteUser: async () => {
            return new Promise((resolve, reject) => {
                const user = authState.getCurrentUser();
                checkUser(user);
                return deleteUser(user).then(() => {
                    logger.info("User deleted successfully.", user);
                    resolve(true);
                }).catch((error) => {
                    logger.error("Error deleting user:", error);
                    reject(error);
                });
            })
        }
     };
}

