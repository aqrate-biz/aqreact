## Firebase

Il componente `Firebase` fornisce un contesto React per l’inizializzazione e la gestione di una app Firebase all’interno della tua applicazione React. Questo componente si occupa di creare e condividere l’istanza Firebase tramite Context, rendendola accessibile a tutti i componenti figli tramite l’hook `useFirebase`.

### Props

- **config**: (object, obbligatorio)  
  Oggetto di configurazione Firebase (ottenibile dalla console Firebase).  
  Deve contenere almeno le chiavi: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto Firebase.

### Funzionalità del context

Il context fornito da `Firebase` espone:

- `app`: l’istanza Firebase inizializzata.
- `setApp(newApp)`: funzione per aggiornare l’istanza Firebase.

### Esempio di utilizzo base

```jsx
import React from "react";
import Firebase from "aqreact";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

export default function App() {
  return (
    <Firebase config={config}>
      <div>La tua app React con Firebase!</div>
    </Firebase>
  );
}
```

### Utilizzo con l’hook `useFirebase`

Per accedere all’istanza Firebase nei componenti figli, puoi usare l’hook `useFirebase`:

```jsx
import React from "react";
import { useFirebase } from "aqreact/hooks/useFirebase";

function ShowFirebaseApp() {
  const { app } = useFirebase();
  return <div>Firebase App Name: {app.name}</div>;
}
```

### Esempio avanzato: autenticazione anonima

```jsx
import React from "react";
import Firebase from "aqreact";
import { useFirebase } from "aqreact/hooks/useFirebase";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function AnonymousAuth() {
  const { app } = useFirebase();
  const auth = getAuth(app);

  return (
    <div>
      <button onClick={() => signInAnonymously(auth)}>Login Anonimo</button>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <AnonymousAuth />
    </Firebase>
  );
}
```

### Note

- Il componente `Firebase` deve racchiudere tutti i componenti che necessitano di accedere al contesto Firebase.
- Se la configurazione non è valida o mancante, il componente lancerà un errore.