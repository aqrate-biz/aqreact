
import React from "react";

import { useLogger } from "../hooks/useLogger.js";

const BrowserContext = React.createContext({
    locale: null,
    setLocale: () => {}
});

export default function Browser({ children }) {

    const logger = useLogger('Browser');
    logger.info("Browser component initialized");
    
    const [locale, setLocale] = React.useState();
    
    React.useEffect(() => {
        let locale = null;
        if(window && window.navigator) {
            // Check if the browser supports the locale API
            if (window.navigator.languages && window.navigator.languages.length > 0) {
                locale = window.navigator.languages[0];
            } else if (window.navigator.language) {
                locale = window.navigator.language;
            } else {
                logger.warn('Browser does not support locale detection');
            }
        }
        logger.info("Browser detected locale:", locale);
        setLocale(locale);
    }, []);

    const provider = {
        locale,
        setLocale: (newLocale) => {
            logger.info("BrowserProvider setting new locale:", newLocale);
            setLocale(newLocale);
        }
    }

    return (
        <div className="aqreact-browser-provider" data-locale={locale}>
            <BrowserContext.Provider value={provider}>
                {children}
            </BrowserContext.Provider>
        </div>
    );
}

export function useBrowserContext() {
    return React.useContext(BrowserContext);
}
