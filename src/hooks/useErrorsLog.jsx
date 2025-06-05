import React from "react";

import { useErrorsContext } from "../components/ErrorsLog.jsx";

export function useErrorsLog() {
    const c = useErrorsContext();
    if (!c) {
        throw new Error("useErrorsLog must be used within an ErrorsLogProvider");
    }
    return c
}