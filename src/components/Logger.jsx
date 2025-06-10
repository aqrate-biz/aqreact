
import React from "react";

const LoggerContext = React.createContext({
    entries: [],
    setEntries: () => {},
    addEntry: () => {},
    clearEntries: () => {},
    log: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
});

export default function Logger({ 
    children, 
    loggers = ['console'], 
    levels = ["error", "warn", "info", "debug"], 
    catchAllErrors = true,
    maxEntries = 1000}) {
    
    const [entries, setEntries] = React.useState(null);

    if(catchAllErrors){
        React.useEffect(() => {
            const handleError = (event) => {
                provider.log('error', 'Error', {
                    message: event.message,
                    source: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    error: event.error,
                    type: "window.onerror"
                });
            };

            const handleRejection = (event) => {
                provider.log('error', 'Unhandled Rejection', {
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
    }
    
    const provider = {
        entries,
        setEntries: (newEntries) => {
            if(maxEntries>0 && newEntries && newEntries.length > maxEntries) {
                newEntries = newEntries.slice(-maxEntries); // Keep only the last maxEntries
            }
            setEntries(newEntries);
            return newEntries;
        },
        addEntry: (entry) => {
            setEntries((prevEntries) => {
                if(maxEntries > 0 && prevEntries && prevEntries.length >= maxEntries) {
                    const newEntries = [...(prevEntries || [])];
                    newEntries.shift(); // Remove the oldest entry
                    return [...newEntries, entry];
                } else {
                    return [...(prevEntries || []), entry];
                }
            });
        },
        clearEntries: () => {
            setEntries([]);
            return [];
        },
        log: (level, message, ...args) => {
            if(levels.includes(level)){
                const entry = {
                    level,
                    message,
                    timestamp: new Date().toISOString(),
                    args: args.length > 0 ? args : undefined
                };
                
                if(loggers.includes('console')) {
                    console[level](message, ...args);
                }
                if(loggers.includes('log')) {
                    provider.addEntry(entry);
                }
                
            }
        },
        debug: (message, ...args) => {
            provider.log('debug', message, ...args);
        },
        info: (message, ...args) => {
            provider.log('info', message, ...args);
        },
        warn: (message, ...args) => {
            provider.log('warn', message, ...args);
        },
        error: (message, ...args) => {
            provider.log('error', message, ...args);
        }
    }

    return (
        <div className="aqreact-log-provider" data-log-loggers={loggers.join(', ')} data-log-levels={levels.join(', ')} data-max-entries={maxEntries}>
            <LoggerContext.Provider value={provider}>
                {children}
                <div className="log-entries">
                    {entries && entries.map((entry, index) => (
                        <div key={index} className={`log-entry log-${entry.level}`}>
                            <span className="log-timestamp">{entry.timestamp}</span>
                            <span className="log-message">{entry.message}</span>
                            {entry.args && entry.args.length > 0 && (
                                <span className="log-args">{JSON.stringify(entry.args)}</span>
                            )}
                        </div>
                    ))}
                </div>
            </LoggerContext.Provider>
        </div>
    );
}

export function useLoggerContext() {
    return React.useContext(LoggerContext);
}
