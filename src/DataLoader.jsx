import React from 'react';

import { useDataContext, getSetFunctionName } from './DataProvider.jsx';

export default function DataLoader({ type, dataKey, options }) {

    const dataContext = useDataContext();
    const setValue = dataContext[getSetFunctionName(dataKey)];

    React.useEffect(() => {
        if (!dataContext) {
            throw new Error("DataLoader must be used within a DataProvider");
        }
        if (!dataContext[dataKey]) {
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
    }
}