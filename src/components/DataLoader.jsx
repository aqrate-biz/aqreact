
import React from "react";

import { useLogger } from "../hooks/useLogger.js";

const DataContext = React.createContext({
    data: null,
    setData: () => {},
    error: null,
    setError: () => {},
    status: 'idle',
    setStatus: () => {}
});


export default function DataLoader({ children, url, params, onStatusChange, onError, onData }) {

    const logger = useLogger('DataLoader');
    logger.info("DataLoader component initialized");
    
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [status, setStatus] = React.useState('idle');

    const _setStatus = (newStatus) => {
        setStatus(newStatus);
        if(onStatusChange) {
            onStatusChange(newStatus);
        }
    }

    const _setError = (newError) => {
        setError(newError);
        if(onError) {
            onError(newError);
        }
    }

    const _setData = (newData) => {
        setData(newData);
        if(onData) {
            onData(newData);
        }
    }

    //TODO altre sorgenti di dati oltre a fetch e possibilità di impostare un intervallo di polling
    React.useEffect(() => {
        async function fetchData() {
            _setStatus('loading');

            const response = await fetch(url + (params ? '?' + new URLSearchParams(params) : ''));
            if (!response.ok) {
                const errorText = await response.text();
                logger.error("Error fetching data:", errorText);
                _setError(new Error(errorText));
                _setStatus('error');
                return;
            } else {
                const json = await response.json(); //TODO handle non-JSON responses
                logger.info("Data fetched successfully:", json);
                _setData(json);
                _setStatus('success');
            }
        }
        fetchData();
    }, []);

    const provider = {
        data,
        setData: (newData) => {
            logger.info("DataLoader setting new data:", newData);
            setData(newData);
        },
        error,
        setError: (newError) => {
            logger.error("DataLoader setting new error:", newError);
            setError(newError);
        },
        status,
        setStatus: (newStatus) => {
            logger.info("DataLoader setting new status:", newStatus);
            setStatus(newStatus);
        }
    }

    return (
        <div className="aqreact-dataloader-provider" data-status={status}>
            <DataContext.Provider value={provider}>
                {children}
            </DataContext.Provider>
        </div>
    );
}

export function useDataContext() {
    return React.useContext(DataContext);
}
