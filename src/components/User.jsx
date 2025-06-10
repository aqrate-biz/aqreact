
import React from "react";

import initSchema from "../lib/initSchema";

const UserContext = React.createContext({
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
    const [user, setUser] = React.useState(initUser);

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
            logger.info("UserProvider logging in user:", userData);
            setUser(userData);
        },
        logout: () => {
            logger.info("UserProvider logging out user");
            setUser(null);
        },
        getUserSchema: () => {
            return userSchema;
        }
    }

    return (
        <div className="aqreact-user-provider" data-user-id={user && user.id}>
            <UserContext.Provider value={provider}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export function useUserContext() {
    return React.useContext(UserContext);
}
