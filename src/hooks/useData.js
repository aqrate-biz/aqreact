import React from "react";

import { useDataContext } from "../components/DataLoader.jsx";

export function useData() {
    const c = useDataContext();
    if (!c) {
        throw new Error("useData must be used within a DataLoaderProvider");
    }
    return c;
}