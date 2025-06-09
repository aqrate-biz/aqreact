import React from "react";

import { useAppContext } from "../components/App.jsx";

export function useApp() {
    const c = useAppContext();
    if (!c) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return c.appConfig;
}