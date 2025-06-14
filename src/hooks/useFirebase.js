import React from "react";

import { useFirebaseContext } from "../components/Firebase.jsx";

export function useFirebase() {
    const fc = useFirebaseContext();
    if (!fc || !fc.app) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return fc;
}