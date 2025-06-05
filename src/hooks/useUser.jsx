import React from "react";

import { useUserContext } from "../components/User.jsx";

export function useUser() {
    const uc = useUserContext();
    if (!uc) {
        throw new Error("useUser must be used within a UserProvider");
    }
    for(const key in uc.getUserSchema()){
        if(!uc.hasOwnProperty(key)) {
            uc[key] = (uc.user && uc.user[key]) || null;
        }
    }
    return uc;
}