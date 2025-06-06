import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext({
    appConfig: null,
    setConfig: () => {}
});

export default function App({ children, config }) {
    
    const [appConfig, setAppConfig] = useState(config || {});
    
    

    const provider = {
        appConfig,
        setAppConfig: (newConfig) => {
            console.log("AppProvider setting new config:", newConfig);
            setAppConfig(newConfig);
        }
    }

    return (
        <AppContext.Provider value={provider}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
