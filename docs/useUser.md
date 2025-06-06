## useUser

L’hook `useUser` permette di accedere facilmente al contesto utente fornito dal componente `User`. Restituisce un oggetto che include lo stato dell’utente e vari metodi per gestire autenticazione, ruoli e aggiornamento dei dati utente.

### Props/Parametri

L’hook `useUser` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `User` più vicino nell’albero dei componenti.

### Funzionalità

L’oggetto restituito da `useUser` contiene:

- **user**: l’oggetto utente corrente (es. `{ id, name, email, role }`)
- **setUser(userData)**: aggiorna lo stato utente
- **isAuthenticated()**: ritorna `true` se l’utente è autenticato
- **isRole(role)**: ritorna `true` se l’utente ha il ruolo specificato (stringa o array di stringhe)
- **login(userData)**: effettua il login impostando i dati utente
- **logout()**: effettua il logout azzerando i dati utente
- **getUserSchema()**: restituisce lo schema utente attuale

Inoltre, per ogni chiave dello schema utente, viene aggiunta una proprietà corrispondente (es. `name`, `email`).

### Esempio d’uso

```jsx
import React from "react";
import User from "aqreact";
import { useUser } from "aqreact/hooks/useUser";

function UserProfile() {
  const user = useUser();

  if (!user.isAuthenticated()) {
    return (
      <button
        onClick={() =>
          user.login({ id: "1", name: "Mario Rossi", email: "mario@esempio.com", role: "ADMIN" })
        }
      >
        Login
      </button>
    );
  }

  return (
    <div>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Ruolo: {user.role}</p>
      <button onClick={user.logout}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <User userSchema={{
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      role: { type: "string" }
    }}>
      <UserProfile />
    </User>
  );
}
```