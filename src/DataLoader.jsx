import React from 'react';

import { useDataContext, getSetFunctionName } from './DataProvider.jsx';

export default function DataLoader({ type, dataKey, options }) {

    const dataContext = useDataContext();
    const setValue = dataContext[getSetFunctionName(dataKey)];

    React.useEffect(() => {
        if (!dataContext) {
            throw new Error("DataLoader must be used within a DataProvider");
        }
        if (dataContext[dataKey]===undefined) {
            throw new Error(`DataLoader: dataKey "${dataKey}" not found in DataProvider`);
        }
        if (!loaders[type]) {
            throw new Error(`DataLoader: type "${type}" not found`);
        }
        console.log(`DataLoader: loading data for ${dataKey} with type ${type}`, options);
        loaders[type]?.(setValue, options);
      }, [setValue]);
    

    return null;
}

const loaders = {
    'init': (fn, options) => {
        setTimeout(() => {
            fn(options.value || null)
        }, options.delay || 0);
    },
    'browser': (fn, options) => {
        fn(serializeNavigator(window.navigator) || null);
    },
}

function serializeNavigator(obj, visited = new WeakSet()) {
    if (visited.has(obj)) {
        return {}; // skip already visited object to prevent cycles
    }
    visited.add(obj); // add the current object to the visited set

    var result = {}, _tmp;
    for (var i in obj) {
        try {
            // enabledPlugin is too nested, also skip functions
            if (i === 'enabledPlugin' || typeof obj[i] === 'function') {
                continue;
            } else if (typeof obj[i] === 'object') {
                // get props recursively
                _tmp = serializeNavigator(obj[i], visited);
                // if object is not {}
                if (Object.keys(_tmp).length) {
                    result[i] = _tmp;
                }
            } else {
                // string, number or boolean
                result[i] = obj[i];
            }
        } catch (error) {
            // handle error, you can log it here if needed
            // console.error('Error:', error);
        }
    }
    return result;
}