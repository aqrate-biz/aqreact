## useFirebaseAuthState

L’hook `useFirebaseAuthState` permette di gestire lo stato di autenticazione dell’utente tramite Firebase Authentication. Fornisce metodi per ascoltare i cambiamenti di autenticazione, ottenere l’utente attualmente autenticato e recuperare il token JWT dell’utente.

### Props/Parametri

L’hook `useFirebaseAuthState` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Firebase` e l’hook `useFirebaseAuth`.

### Funzionalità

Restituisce un oggetto con i seguenti metodi:

- **setStateChangeCallback(callback)**:  
  Registra una funzione di callback che verrà chiamata ogni volta che lo stato di autenticazione cambia.  
  La callback riceve come parametro l’oggetto utente Firebase (o `null` se non autenticato).

- **getCurrentUser()**:  
  Restituisce l’utente attualmente autenticato (oggetto con proprietà come `uid`, `email`, `displayName`, ecc.), oppure `null` se non autenticato.

- **getToken()**:  
  Restituisce una Promise che risolve con il token JWT dell’utente autenticato. Lancia un errore se non c’è un utente autenticato.

### Esempio d’uso

```jsx
import React, { useEffect, useState } from "react";
import Firebase from "aqreact";
import { useFirebaseAuthState } from "aqreact/hooks/useFirebaseAuthState";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function AuthStatus() {
  const authState = useFirebaseAuthState();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    authState.setStateChangeCallback((u) => {
      setUser(u);
      if (u) {
        authState.getToken().then(setToken);
      } else {
        setToken("");
      }
    });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>Utente autenticato: {user.email}</p>
          <p>Token: {token}</p>
        </>
      ) : (
        <p>Nessun utente autenticato</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <AuthStatus />
    </Firebase>
  );
}
```