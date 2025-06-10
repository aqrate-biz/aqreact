
import React from "react";

import { useLogger } from "../hooks/useLogger.js";

const APIContext = React.createContext({
    baseUrl: null,
    setBaseUrl: () => {},
    authMode: null,
    setAuthMode: () => {}
});

export default function API({ children, baseUrl, authMode }) {
    
    const logger = useLogger('API');
    logger.info("API component initialized:", baseUrl, authMode);

    const provider = {
        baseUrl,
        setBaseUrl: (newBaseUrl) => {
            logger.info("APIProvider setting new base URL:", newBaseUrl);
            baseUrl = newBaseUrl;
        },
        authMode,
        setAuthMode: (newAuthMode) => {
            logger.info("APIProvider setting new auth mode:", newAuthMode);
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
    return React.useContext(APIContext);
}
