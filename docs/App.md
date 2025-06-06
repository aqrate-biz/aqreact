## App

Il componente `App` fornisce un contesto React per la configurazione globale dell’applicazione. Permette di centralizzare e condividere informazioni come nome, versione, URL delle API e altre impostazioni tra tutti i componenti figli tramite context e l’hook `useApp`.

### Props/Parametri

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto dell’applicazione.

- **config**: (object, opzionale)  
  Oggetto di configurazione globale dell’applicazione. Può contenere chiavi come:
  - `appName`: (string) Nome dell’applicazione
  - `appVersion`: (string) Versione dell’applicazione
  - `apiBaseUrl`: (string) URL base delle API
  - ...altre chiavi personalizzate

### Funzionalità

Il context fornito da `App` espone:

- `appConfig`: Oggetto di configurazione attuale dell’applicazione.
- `setAppConfig(newConfig)`: Funzione per aggiornare la configurazione globale.

L’hook [`useApp`](useApp.md) permette di accedere direttamente a `appConfig` nei componenti figli.

### Esempio d’uso

```jsx
import React from "react";
import App from "aqreact";
import { useApp } from "aqreact/hooks/useApp";

function ShowAppConfig() {
  const app = useApp();
  return (
    <div>
      <p>Nome app: {app.appName}</p>
      <p>Versione: {app.appVersion}</p>
      <p>API Base URL: {app.apiBaseUrl}</p>
    </div>
  );
}

export default function MyApp() {
  return (
    <App config={{
      appName: "My App",
      appVersion: "1.0.0",
      apiBaseUrl: "https://api.example.com"
    }}>
      <ShowAppConfig />
    </App>
  );
}
```