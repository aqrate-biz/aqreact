import React from "react";

import { useAPIContext } from "../components/API.jsx";
import { useFirebaseAuthState } from "./useFirebaseAuthState";

function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
}

function getUrl(baseUrl, endpoint, data) {
    if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
    }
    if (endpoint.startsWith("/")) {
        endpoint = endpoint.substring(1);
    }
    if(data && typeof data === "object") {
        const queryParams = new URLSearchParams(data).toString();
        if (queryParams) {
            endpoint += `?${queryParams}`;
        }
    }
    if(data && typeof data === "string") {
        endpoint += `?${data}`;
    }
    return `${baseUrl}${endpoint}`;
}

function getBody(data) {
    if (data === undefined || data === null) {
        return null;
    }
    if (typeof data === "object") {
        return JSON.stringify(data);
    }
    //TODO: handle other data types if needed
    
    return data.toString();
}

function getHeaders(options, data, authMode) {
    const headers = {
        "Content-Type": "application/json", //TODO modificare in base a data
        ...options.headers,
    };
    
    if (authMode === "token" && options.token) {
        headers["Authorization"] = `Bearer ${options.token}`;
    } else if (authMode === "basic" && options.username && options.password) {
        headers["Authorization"] = `Basic ${btoa(`${options.username}:${options.password}`)}`;
    } else if (authMode === "firebase") {
        const { getToken } = useFirebaseAuthState();
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }
    
    return headers;
}



export function useAPI() {

    const { baseUrl, authMode } = useAPIContext();
    if (!baseUrl) {
        throw new Error("useAPI must be used within an APIProvider with a baseUrl");
    }
    //TODO cors, response type, etc.
    
    const calls = {
        call: async (endpoint, data, options = {}) => {
            const response = await fetch(getUrl(baseUrl, endpoint), {
                method: options.method || "GET",
                headers: getHeaders(options, data, authMode),
                body: getBody(data)
            });
            checkResponse(response);
            return response.json();
        },
        get: async (endpoint, data, options = {}) => {
            //TODO data to query params
            const response = await fetch(getUrl(baseUrl, endpoint, data), {
                method: "GET",
                headers: getHeaders(options, null, authMode),
            });
            checkResponse(response);
            return response.json();
        },
        post: async (endpoint, data, options = {}) => {
            const response = await fetch(getUrl(baseUrl, endpoint), {
                method: "POST",
                headers: getHeaders(options, data, authMode),
                body: getBody(data)
            });
            checkResponse(response);
            return response.json();
        },
        put: async (endpoint, data, options = {}) => {
            const response = await fetch(getUrl(baseUrl, endpoint), {
                method: "PUT",
                headers: getHeaders(options, data, authMode),
                body: getBody(data)
            });
            checkResponse(response);
            return response.json();
        },
        delete: async (endpoint, data, options = {}) => {
            const response = await fetch(getUrl(baseUrl, endpoint), {
                method: "DELETE",
                headers: getHeaders(options, null, authMode),
            });
            checkResponse(response);
            return response.json();
        },
        patch: async (endpoint, data, options = {}) => {
            const response = await fetch(getUrl(baseUrl, endpoint), {
                method: "PATCH",
                headers: getHeaders(options, data, authMode),
                body: getBody(data),
                ...options,
            });
            checkResponse(response);
            return response.json();
        },
        head: async (endpoint, data, options = {}) => {
            const response = await fetch(getUrl(baseUrl, endpoint), {
                method: "HEAD",
                headers: getHeaders(options, null, authMode),
            });
            checkResponse(response);
            return response.headers;
        }
    };

    return calls;
}