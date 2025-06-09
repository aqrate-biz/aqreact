import React from 'react';
import App from '../src/components/App';
import { useApp } from '../src/hooks/useApp';

export default {
  component: App,
  subcomponents: {  }
};


function ShowAppConfig() {
  const app = useApp();
  return (
    <pre>
        App name: {app && app.appName}<br />
        App version: {app && app.appVersion}<br />
        API Base URL: {app && app.apiBaseUrl}
    </pre>
  );
}

export const AppConfig = {
  render: (args) => (
    <App config={{
        appName: 'My App',
        appVersion: '1.0.0',
        apiBaseUrl: 'https://api.example.com'}}>
            <ShowAppConfig />
    </App>    
  ),
};
