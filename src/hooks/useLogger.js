import React from "react";

import { useLoggerContext } from "../components/Logger.jsx";

export function useLogger(name) {
    const c = useLoggerContext();

    function prepareEntry(entry, name) {
        return {
            ...entry,
            logName: entry.logName || name,
            timestamp: entry.timestamp || new Date().toISOString(),
        };
    }
    function prepareMessage(message, name) {
        if (typeof message === 'string') {
            return new Date().toISOString() + " [" + name + "] " + message;
        } else if (typeof message === 'object') {
            return { ...message, logName: name, timestamp: new Date().toISOString() };
        }
        return message;
    }

    const logger = {
        name: name,
        context: c,
        entries: c.entries,
        setEntries: (entries) => {
            entries = (entries || []).map((entry) => {
                return prepareEntry(entry, name);
            })
            return c.setEntries(entries);
        },
        addEntry: (entry) => {
            entry = prepareEntry(entry, name);
            return c.addEntry(entry);
        },
        clearEntries: c.clearEntries,
        log: (level, message, ...args) => {
            message = prepareMessage(message, name);
            c.log(level, message, ...args);
        },
        debug: (message, ...args) => {
            message = prepareMessage(message, name);
            c.debug(message, ...args);
        },
        info: (message, ...args) => {
            message = prepareMessage(message, name);
            c.info(message, ...args);
        },
        warn: (message, ...args) => {
            message = prepareMessage(message, name);
            c.warn(message, ...args);
        },
        error: (message, ...args) => {
            message = prepareMessage(message, name);
            c.error(message, ...args);
        }
    };
    return logger
}