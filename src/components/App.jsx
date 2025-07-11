import React from "react";

import Browser from "./Browser.jsx";
import API from "./API.jsx";
import Logger from "./Logger.jsx";
import Firebase from "./Firebase.jsx";
import FirebaseUser from "./FirebaseUser.jsx";
import User from "./User.jsx";
import { useLogger } from "../hooks/useLogger.js";

const AppContext = React.createContext({
    appConfig: null,
    setConfig: () => {}
});

export default function App({ children, config }) {

    const logger = useLogger('App');

    logger.info("App component initialized with config:", config)
    
    const [appConfig, setAppConfig] = React.useState(config || {});
    
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
    if(config.withLogger && config.logger) {
        children = (
            <Logger {...config.logger}>
                {children}
            </Logger>
        );
    }

    const provider = {
        appConfig,
        setAppConfig: (newConfig) => {
            logger.info("AppProvider setting new config:", newConfig);
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
    return React.useContext(AppContext);
}
