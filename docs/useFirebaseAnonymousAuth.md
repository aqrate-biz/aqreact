## useFirebaseAnonymousAuth

L’hook `useFirebaseAnonymousAuth` permette di gestire facilmente l’autenticazione anonima tramite Firebase Authentication in una app React. Fornisce metodi per effettuare il login e il logout anonimo, sfruttando il contesto Firebase già inizializzato.

### Props/Parametri

L’hook `useFirebaseAnonymousAuth` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Firebase` e l’hook `useFirebaseAuth`.

### Funzionalità

Restituisce un oggetto con i seguenti metodi:

- **signIn()**: Effettua il login anonimo tramite Firebase Authentication.
- **signOut()**: Effettua il logout dell’utente anonimo.

Entrambi i metodi gestiscono automaticamente eventuali errori e stampano messaggi di log in console.

### Esempio d’uso

```jsx
import React from "react";
import Firebase from "aqreact";
import { useFirebaseAnonymousAuth } from "aqreact/hooks/useFirebaseAnonymousAuth";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function AnonymousAuthButtons() {
  const { signIn, signOut } = useFirebaseAnonymousAuth();
  return (
    <div>
      <button onClick={signIn}>Login Anonimo</button>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <AnonymousAuthButtons />
    </Firebase>
  );
}
```