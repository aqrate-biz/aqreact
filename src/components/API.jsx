
import React, { createContext, useContext, useState, useEffect } from "react";

const APIContext = createContext({
    baseUrl: null,
    setBaseUrl: () => {},
    authMode: null,
    setAuthMode: () => {}
});

export default function API({ children, baseUrl, authMode }) {
    
    

    const provider = {
        baseUrl,
        setBaseUrl: (newBaseUrl) => {
            console.log("APIProvider setting new base URL:", newBaseUrl);
            baseUrl = newBaseUrl;
        },
        authMode,
        setAuthMode: (newAuthMode) => {
            console.log("APIProvider setting new auth mode:", newAuthMode);
            authMode = newAuthMode;
        },
    }

    return (
        <div className="aqreact-api-provider" data-base-url={baseUrl} data-auth-mode={authMode}>
            <APIContext.Provider value={provider}>
                {children}
            </APIContext.Provider>
        </div>
    );
}

export function useAPIContext() {
    return useContext(APIContext);
}
