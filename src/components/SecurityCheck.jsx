import React from "react";

import User from "./User.jsx"
import { useUser } from "../hooks/useUser";
import SecurityRule from "../lib/SecurityRule";
import { useLogger } from "../hooks/useLogger.js";

export default function SecurityCheck({ 
    children,
    rules = [],
    alternativeComponent = null,
}) {
    const user = useUser();
    const logger = useLogger('SecurityCheck');

    const [isAllowed, setIsAllowed] = React.useState(null);

    React.useEffect(() => {
        let allowed = null
        for(const rule of rules) {
            logger.debug("SecurityCheck rule:", rule);
            const securityRule = new SecurityRule(rule);
            if (!securityRule.isAllowed(user)) {
                logger.debug("SecurityCheck rule not allowed:", rule);
                allowed = false;
                break; 
            }
        }
        logger.info("SecurityCheck all rules checked:", allowed);
        if (allowed !== false) {
            allowed = true;
        }
        setIsAllowed(allowed);
    }, [rules, user]);


    return (
        <div className="aqreact-security-check" data-is-allowed={isAllowed}>
            <User userSchema={user.getUserSchema()}>
                { isAllowed ? children : alternativeComponent }
            </User>
        </div>
    )
}