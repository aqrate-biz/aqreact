import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useFirebaseContext } from "../components/Firebase.jsx";

export function useFirebaseAuth() {
    const fc = useFirebaseContext();
    if (!fc) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    if(!fc.app){
        throw new Error("Firebase app is not initialized. Please provide a valid Firebase configuration.");
    }
    if(!fc.auth){
        fc.auth = getAuth(fc.app);
    }
    return fc.auth;
}