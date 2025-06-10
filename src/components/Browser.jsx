
import React, { createContext, useContext, useState, useEffect } from "react";

const BrowserContext = createContext({
    locale: null,
    setLocale: () => {}
});

export default function Browser({ children }) {
    
    const [locale, setLocale] = useState();
    
    useEffect(() => {
        let locale = null;
        if(window && window.navigator) {
            // Check if the browser supports the locale API
            if (window.navigator.languages && window.navigator.languages.length > 0) {
                locale = window.navigator.languages[0];
            } else if (window.navigator.language) {
                locale = window.navigator.language;
            } else {
                console.warn('Browser does not support locale detection');
            }
        }
        setLocale(locale);
    }, []);

    const provider = {
        locale,
        setLocale: (newLocale) => {
            console.log("BrowserProvider setting new locale:", newLocale);
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
    return useContext(BrowserContext);
}
