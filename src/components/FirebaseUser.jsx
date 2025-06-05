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
                user.login({
                    id: u.uid,
                    name: u.displayName || "Anonymous",
                    email: u.email || "No email",
                    role: "USER"
                });
            } else {
                console.log("Firebase user logged out");
                user.logout();
            }
        })
    }, []);

    return (
        <>
            <div className="firebase-user">
                <h1>Firebase User</h1>
                <p>User ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Authenticated: {user.isAuthenticated() ? "Yes" : "No"}</p>
            </div>
            {children}
        </>
    );
}