
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function getSetFunctionName(key) {
    return `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
}

export default function DataProvider({ 
    name = 'DataProvider',
    children, 
    dataKeys = [],
    initialData = {}
}) {
  
    if(!Array.isArray(dataKeys)) {
        if(typeof dataKeys === 'string') {
            if(dataKeys.indexOf(',') > -1) {
                dataKeys = dataKeys.split(',').map(key => key.trim());
            } else {
                dataKeys = [dataKeys];
            }
        } else {
            throw new Error("dataKeys must be an array");
        }
    }

    const states = {}
    const setStates = {}
    const provider = {}
    for (let i = 0; i < dataKeys.length; i++) {
        const key = dataKeys[i];
        const [ value, setValue ] = useState(initialData[key] || null);
        states[key] = value;
        setStates[key] = (v) => {
            console.log(`DataProvider ${name} setting value for ${key}:`, v);
            setValue(v);
        }
        provider[key] = states[key];
        provider[getSetFunctionName(key)] = setStates[key];
    }

    return (
        <DataContext.Provider value={provider}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
  return useContext(DataContext);
}

export function useData(dataKey) {
    const dataContext = useDataContext();
    if (!dataContext) {
        throw new Error("useData must be used within a DataProvider");
    }
    if (!dataContext[dataKey]) {
        throw new Error(`Data key "${dataKey}" not found in DataProvider`);
    }
    return dataContext[dataKey];
}