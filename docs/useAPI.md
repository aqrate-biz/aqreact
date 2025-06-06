## useAPI

L’hook `useAPI` permette di accedere facilmente ai metodi per effettuare chiamate HTTP verso un endpoint REST, utilizzando il contesto fornito dal componente `API`. Gestisce automaticamente l’URL base e la modalità di autenticazione configurata.

### Props/Parametri

L’hook `useAPI` non accetta parametri direttamente. Utilizza la configurazione fornita dal componente `API` più vicino nell’albero dei componenti.

### Funzionalità

L’oggetto restituito da `useAPI` espone i seguenti metodi asincroni:

- **call(endpoint, data, options)**: Effettua una chiamata HTTP generica (puoi specificare il metodo tramite `options.method`).
- **get(endpoint, data, options)**: Effettua una richiesta GET.
- **post(endpoint, data, options)**: Effettua una richiesta POST.
- **put(endpoint, data, options)**: Effettua una richiesta PUT.
- **delete(endpoint, data, options)**: Effettua una richiesta DELETE.
- **patch(endpoint, data, options)**: Effettua una richiesta PATCH.
- **head(endpoint, data, options)**: Effettua una richiesta HEAD.

Tutti i metodi restituiscono una Promise con la risposta (tipicamente in formato JSON).

### Esempio d’uso

```jsx
import React from "react";
import API from "aqreact";
import { useAPI } from "aqreact/hooks/useAPI";

function UsersList() {
  const api = useAPI();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    api.get('users')
      .then(setUsers)
      .catch((err) => console.error("Errore API:", err));
  }, []);

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name} ({u.email})</li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <API baseUrl="https://api.example.com/" authMode="token">
      <UsersList />
    </API>
  );
}
```