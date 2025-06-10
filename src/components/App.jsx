import React, { createContext, useContext, useState, useEffect } from "react";

import Browser from "./Browser.jsx";
import API from "./API.jsx";
import Log from "./Log.jsx";
import Firebase from "./Firebase.jsx";
import FirebaseUser from "./FirebaseUser.jsx";
import User from "./User.jsx";

const AppContext = createContext({
    appConfig: null,
    setConfig: () => {}
});

export default function App({ children, config }) {
    
    const [appConfig, setAppConfig] = useState(config || {});
    
    if(config.withFirebase && config.firebase) {
        children = (
            <Firebase config={config.firebase}>
                <FirebaseUser>
                    {children}
                </FirebaseUser>
            </Firebase>
        );
    }

    if(config.withAPI && config.api) {
        children = (
            <API {...config.api}>
                {children}
            </API>
        );
    }
    if(config.withLog && config.log) {
        children = (
            <Log {...config.log}>
                {children}
            </Log>
        );
    }
    if(config.withUser && config.userSchema) {
        children = (
            <User userSchema={config.userSchema}>
                {children}
            </User>
        );
    }

    if(config.withBrowser) {
        children = (
            <Browser>
                {children}
            </Browser>
        );
    }
    

    const provider = {
        appConfig,
        setAppConfig: (newConfig) => {
            console.log("AppProvider setting new config:", newConfig);
            setAppConfig(newConfig);
        }
    }

    return (
        <div className="aqreact-app-provider" data-app-name={appConfig.AppName} data-app-version={appConfig.AppVersion}>
            <AppContext.Provider value={provider}>
                {children}
            </AppContext.Provider>
        </div>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
