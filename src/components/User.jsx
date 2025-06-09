
import React, { createContext, useContext, useState } from "react";

import initSchema from "../lib/initSchema";

const UserContext = createContext({
    user: null,
    setUser: () => {}
});

export default function User({ children, userSchema }) {

    if(!userSchema || typeof userSchema !== 'object') {
        userSchema = {
            id: {
                type: 'string'
            }
        }
    }
    const initUser = initSchema(userSchema);
    const [user, setUser] = useState(initUser);

    const provider = {
        user,
        setUser,
        isAuthenticated: () => user !== null && user.id !== null,
        isRole: (role) => {
            if (!user || !user.role) return false;
            if (Array.isArray(role)) {
                return role.includes(user.role);
            }
            return user.role === role;
        },
        login: (userData) => {
            console.log("UserProvider logging in user:", userData);
            setUser(userData);
        },
        logout: () => {
            console.log("UserProvider logging out user");
            setUser(null);
        },
        getUserSchema: () => {
            return userSchema;
        }
    }

    return (
        <UserContext.Provider value={provider}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
