import React from "react";

import User from "./User.jsx"
import { useUser } from "../hooks/useUser";
import SecurityRule from "../lib/SecurityRule";

export default function SecurityCheck({ 
    children,
    rules = [],
    alternativeComponent = null,
}) {
    const user = useUser();

    const [isAllowed, setIsAllowed] = React.useState(null);

    React.useEffect(() => {
        let allowed = null
        for(const rule of rules) {
            console.log("SecurityCheck rule:", rule);
            const securityRule = new SecurityRule(rule);
            if (!securityRule.isAllowed(user)) {
                console.log("SecurityCheck rule not allowed:", rule);
                allowed = false;
                break; 
            }
        }
        console.log("SecurityCheck all rules checked, isAllowed:", allowed);
        if (allowed !== false) {
            console.log("SecurityCheck all rules allowed");
            allowed = true;
        }
        setIsAllowed(allowed);
    }, [rules, user]);


    return (
        <User userSchema={user.getUserSchema()}>
            { isAllowed ? children : alternativeComponent }
        </User>
    )
}