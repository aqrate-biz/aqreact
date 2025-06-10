import React, { useEffect } from "react";

import { useFirebaseAuthState } from "../hooks/useFirebaseAuthState";
import { useUser } from "../hooks/useUser";

export default function FirebaseUser({ children }) {

    const firebaseAuthState = useFirebaseAuthState();
    const user = useUser();

    useEffect(() => {
        firebaseAuthState.setStateChangeCallback((u) => {
            console.log("Firebase auth state changed:", u);
            if(u) {
                console.log("Firebase user logged in:", u);
                user.login(firebaseAuthState.getCurrentUser());
            } else {
                console.log("Firebase user logged out");
                user.logout();
            }
        })
    }, []);

    return (
        <div className="aqreact-firebase-user" data-user-id={user.id}>
            {children}
        </div>
    );
}