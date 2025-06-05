import React from "react";

import { useBrowserContext } from "../components/Browser.jsx";

export function useLocale() {
    const c = useBrowserContext();
    if (!c) {
        throw new Error("useLocale must be used within a BrowserProvider");
    }
    return c.locale;
}