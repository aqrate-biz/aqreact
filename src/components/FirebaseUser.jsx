import React from "react";

import { useFirebaseAuthState } from "../hooks/useFirebaseAuthState";
import { useUser } from "../hooks/useUser";
import { useLogger } from "../hooks/useLogger.js";

export default function FirebaseUser({ children }) {

    const firebaseAuthState = useFirebaseAuthState();
    const user = useUser();
    const logger = useLogger('FirebaseUser');

    React.useEffect(() => {
        firebaseAuthState.setStateChangeCallback((u) => {
            logger.info("Firebase auth state changed:", u);
            if(u) {
                logger.info("Firebase user logged in:", u);
                user.login(firebaseAuthState.getCurrentUser());
            } else {
                logger.info("Firebase user logged out");
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