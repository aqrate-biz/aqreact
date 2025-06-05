
import React, { createContext, useContext, useState, useEffect } from "react";

const ErrorsContext = createContext({
    errors: [],
    addError: () => {},
    clearErrors: () => {}
});

export default function ErrorsLog({ children }) {
    
    const [errors, setErrors] = useState();

    useEffect(() => {
        const handleError = (event) => {
            provider.addError({
                message: event.message,
                source: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
                type: "window.onerror"
            });
        };

        const handleRejection = (event) => {
            provider.addError({
                message: event.reason ? event.reason.message || String(event.reason) : "Unhandled promise rejection",
                error: event.reason,
                type: "unhandledrejection"
            });
        };

        window.addEventListener("error", handleError);
        window.addEventListener("unhandledrejection", handleRejection);

        return () => {
            window.removeEventListener("error", handleError);
            window.removeEventListener("unhandledrejection", handleRejection);
        };
    }, []);
    
    const provider = {
        errors,
        setErrors: (newErrors) => {
            console.log("ErrorsLogProvider setting new errors:", newErrors);
            setErrors(newErrors);
        },
        addError: (error) => {
            console.error("Adding error to ErrorsLog:", error);
            setErrors((prevErrors) => [...(prevErrors || []), error]);
        },
        clearErrors: () => {
            console.log("Clearing all errors in ErrorsLog");
            setErrors([]);
        }
    }

    return (
        <ErrorsContext.Provider value={provider}>
            {children}
        </ErrorsContext.Provider>
    );
}

export function useErrorsContext() {
    return useContext(ErrorsContext);
}
