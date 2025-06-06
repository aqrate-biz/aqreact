## API

Il componente `API` fornisce un contesto React per la gestione centralizzata delle chiamate HTTP verso un endpoint REST. Permette di configurare l’URL base e la modalità di autenticazione, rendendo disponibili metodi per effettuare richieste HTTP tramite l’hook `useAPI`.

### Props/Parametri

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto API.

- **baseUrl**: (string, obbligatorio)  
  L’URL base dell’API a cui verranno indirizzate le richieste.

- **authMode**: (string, opzionale)  
  Modalità di autenticazione da utilizzare per le richieste. Può essere `"token"`, `"basic"`, `"firebase"` o vuoto.

### Funzionalità

Il context fornito da `API` espone:

- `baseUrl`: L’URL base configurato.
- `setBaseUrl(newBaseUrl)`: Cambia l’URL base.
- `authMode`: Modalità di autenticazione attuale.
- `setAuthMode(newAuthMode)`: Cambia la modalità di autenticazione.

L’hook [`useAPI`](useAPI.md) fornisce i seguenti metodi per effettuare richieste HTTP:

- `call(endpoint, data, options)`: Chiamata generica.
- `get(endpoint, data, options)`: Richiesta GET.
- `post(endpoint, data, options)`: Richiesta POST.
- `put(endpoint, data, options)`: Richiesta PUT.
- `delete(endpoint, data, options)`: Richiesta DELETE.
- `patch(endpoint, data, options)`: Richiesta PATCH.
- `head(endpoint, data, options)`: Richiesta HEAD.

### Esempio d’uso

```jsx
import React from "react";
import API from "aqreact";
import { useAPI } from "aqreact/hooks/useAPI";

function CallApi() {
  const api = useAPI();
  const [response, setResponse] = React.useState(null);

  return (
    <div>
      <button onClick={async () => {
        try {
          const res = await api.get('users');
          setResponse(JSON.stringify(res, null, 2));
        } catch (error) {
          setResponse(`Error: ${error.message}`);
        }
      }}>
        Recupera utenti
      </button>
      <pre>{response ? response : "Nessuna risposta"}</pre>
    </div>
  );
}

export default function App() {
  return (
    <API baseUrl="https://api.example.com/" authMode="token">
      <CallApi />
    </API>
  );
}
```