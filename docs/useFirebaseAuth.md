## useFirebaseAuth

L’hook `useFirebaseAuth` permette di accedere facilmente all’oggetto `auth` di Firebase Authentication, già inizializzato tramite il contesto fornito dal componente `Firebase`. Consente di gestire l’autenticazione degli utenti (login, logout, stato utente, ecc.) in modo semplice e integrato.

### Props/Parametri

L’hook `useFirebaseAuth` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Firebase` più vicino nell’albero dei componenti.

### Funzionalità

Restituisce l’oggetto `auth` di Firebase, che espone tutti i metodi e proprietà di [Firebase Authentication](https://firebase.google.com/docs/reference/js/auth).

Tra i metodi principali disponibili:

- **signInWithEmailAndPassword(email, password)**: Effettua il login con email e password.
- **signOut()**: Effettua il logout dell’utente autenticato.
- **onAuthStateChanged(callback)**: Permette di ascoltare i cambiamenti di autenticazione.
- **currentUser**: Restituisce l’utente attualmente autenticato (se presente).

### Esempio d’uso

```jsx
import React, { useState } from "react";
import Firebase from "aqreact";
import { useFirebaseAuth } from "aqreact/hooks/useFirebaseAuth";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function LoginForm() {
  const auth = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      setUser(result.user);
    } catch (error) {
      alert("Errore di login: " + error.message);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <p>Benvenuto, {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <LoginForm />
    </Firebase>
  );
}
```