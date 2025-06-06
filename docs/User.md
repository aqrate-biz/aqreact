## User

Il componente `User` fornisce un contesto React per la gestione dello stato utente, autenticazione e ruoli. Permette di centralizzare la logica di login, logout e controllo dei permessi, rendendo disponibili queste funzionalità a tutti i componenti figli tramite context e l’hook `useUser`.

### Props/Parametri

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto utente.

- **userSchema**: (object, opzionale)  
  Oggetto che definisce lo schema dell’utente. Se non fornito, viene usato uno schema di default `{ id: { type: 'string' } }`.

### Funzionalità

Il context fornito da `User` espone:

- `user`: Oggetto utente corrente.
- `setUser(userData)`: Funzione per aggiornare l’utente.
- `isAuthenticated()`: Restituisce `true` se l’utente è autenticato.
- `isRole(role)`: Restituisce `true` se l’utente ha il ruolo specificato (accetta stringa o array di stringhe).
- `login(userData)`: Imposta l’utente come autenticato.
- `logout()`: Esegue il logout dell’utente.
- `getUserSchema()`: Restituisce lo schema utente attuale.

L’hook [`useUser`](useUser.md) permette di accedere facilmente a queste funzionalità nei componenti figli.

### Esempio d’uso

```jsx
import React from "react";
import User from "aqreact";
import { useUser } from "aqreact/hooks/useUser";

const userSchema = {
  id: { type: "string" },
  name: { type: "string" },
  email: { type: "string" },
  role: { type: "string" }
};

function Profile() {
  const user = useUser();

  if (!user.isAuthenticated()) {
    return (
      <button
        onClick={() =>
          user.login({ id: "1", name: "Mario Rossi", email: "mario@esempio.com", role: "admin" })
        }
      >
        Login
      </button>
    );
  }

  return (
    <div>
      <p>Benvenuto, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Ruolo: {user.role}</p>
      <button onClick={user.logout}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <User userSchema={userSchema}>
      <Profile />
    </User>
  );
}
```