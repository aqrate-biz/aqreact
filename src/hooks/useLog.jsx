import React from "react";

import { useLogContext } from "../components/Log.jsx";

export function useLog() {
    const c = useLogContext();
    if (!c) {
        throw new Error("useLog must be used within a LogProvider");
    }
    return c
}