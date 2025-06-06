## useFirebaseGoogleAuth

L’hook `useFirebaseGoogleAuth` permette di gestire facilmente l’autenticazione tramite Google in Firebase Authentication. Consente di avviare il login con popup Google, opzionalmente specificando gli scope e la lingua, e di effettuare il logout.

### Props/Parametri

L’hook `useFirebaseGoogleAuth` accetta i seguenti parametri opzionali:

- **scopes**: (array di stringhe, opzionale)  
  Array di scope Google da aggiungere alla richiesta di autenticazione (es. `["profile", "email"]`).

- **language**: (string, opzionale)  
  Codice lingua per la UI di autenticazione Google (es. `"it"`).

### Funzionalità

Restituisce un oggetto con i seguenti metodi:

- **signIn()**:  
  Avvia il login tramite popup Google. Se la procedura va a buon fine, l’utente viene autenticato tramite Firebase.

- **signOut()**:  
  Effettua il logout dell’utente autenticato.

### Esempio d’uso

```jsx
import React from "react";
import Firebase from "aqreact";
import { useFirebaseGoogleAuth } from "aqreact/hooks/useFirebaseGoogleAuth";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function GoogleAuthButtons() {
  const { signIn, signOut } = useFirebaseGoogleAuth(["profile", "email"], "it");
  return (
    <div>
      <button onClick={signIn}>Login con Google</button>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <GoogleAuthButtons />
    </Firebase>
  );
}
```