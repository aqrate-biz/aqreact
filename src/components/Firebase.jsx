
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

const FirebaseContext = createContext({
    app: null,
    setApp: () => {}
});

export default function Firebase({ children, config }) {

    if (!config || typeof config !== 'object') {
        throw new Error("Firebase config must be an object");
    }

    
    const initializedApp = initializeApp(config);
    console.log("FirebaseProvider initialized with app:", initializedApp);
    
    const [app, setApp] = useState(initializedApp);

    
    const provider = {
        app,
        setApp: (newApp) => {
            console.log("FirebaseProvider setting new app:", newApp);
            setApp(newApp);
        }
    }

    return (
        <FirebaseContext.Provider value={provider}>
            <div className="firebase-app">{app && app._config && app._config.name}</div>
            {children}
        </FirebaseContext.Provider>
    );
}

export function useFirebaseContext() {
    return useContext(FirebaseContext);
}
