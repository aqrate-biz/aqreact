## useApp

L’hook `useApp` permette di accedere facilmente alla configurazione globale dell’applicazione fornita dal componente `App`. Consente di leggere e, tramite il context, aggiornare le informazioni come nome, versione, URL delle API e altre impostazioni condivise.

### Props/Parametri

L’hook `useApp` non accetta parametri direttamente. Utilizza la configurazione fornita dal componente `App` più vicino nell’albero dei componenti.

### Funzionalità

Restituisce l’oggetto di configurazione globale dell’applicazione (`appConfig`), che può includere chiavi come:

- `appName`: Nome dell’applicazione
- `appVersion`: Versione dell’applicazione
- `apiBaseUrl`: URL base delle API
- ...altre chiavi personalizzate definite in fase di configurazione

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