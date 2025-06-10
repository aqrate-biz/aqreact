import React from "react";

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
            const securityRule = new SecurityRule(rule);
            if (!securityRule.isAllowed(user)) {
                logger.debug("SecurityCheck rule not allowed:", rule);
                allowed = false;
                break; 
            } else {
                logger.debug("SecurityCheck rule allowed:", rule);
            }
        }
        if (allowed !== false) {
            allowed = true;
        }
        logger.debug("SecurityCheck final result:", user, allowed);
        setIsAllowed(allowed);
    }, [rules, user]);


    return (
        <div className="aqreact-security-check" data-is-allowed={isAllowed}>
            { isAllowed ? children : alternativeComponent }
        </div>
    )
}