
import React from "react";

import { useLogger } from "../hooks/useLogger.js";

import { initializeApp } from "firebase/app";

const FirebaseContext = React.createContext({
    app: null,
    setApp: () => {}
});

export default function Firebase({ children, config }) {

    if (!config || typeof config !== 'object') {
        throw new Error("Firebase config must be an object");
    }
    const logger = useLogger('Firebase');
    
    const initializedApp = initializeApp(config);
    logger.info("FirebaseProvider initialized with app:", initializedApp);
    
    const [app, setApp] = React.useState(initializedApp);

    
    const provider = {
        app,
        setApp: (newApp) => {
            logger.info("FirebaseProvider setting new app:", newApp);
            setApp(newApp);
        }
    }

    return (
        <div className="aqreact-firebase-provider" data-app-name={app && app._config && app._config.name}>
            <FirebaseContext.Provider value={provider}>
                {children}
            </FirebaseContext.Provider>
        </div>
    );
}

export function useFirebaseContext() {
    return React.useContext(FirebaseContext);
}
