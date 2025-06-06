## Firebase

Il componente `Firebase` fornisce un contesto React per l’inizializzazione e la gestione di una app Firebase all’interno della tua applicazione React. Permette di condividere l’istanza Firebase tra tutti i componenti figli tramite context e l’hook `useFirebase`.

### Props/Parametri

- **config**: (object, obbligatorio)  
  Oggetto di configurazione Firebase (ottenibile dalla console Firebase).  
  Deve contenere almeno le chiavi:  
  `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto Firebase.

### Funzionalità

Il context fornito da `Firebase` espone:

- `app`: L’istanza Firebase inizializzata.
- `setApp(newApp)`: Funzione per aggiornare l’istanza Firebase.

L’hook [`useFirebase`](useFirebase.md) permette di accedere direttamente all’istanza Firebase nei componenti figli.

### Esempio d’uso

```jsx
import React from "react";
import Firebase from "aqreact";
import { useFirebase } from "aqreact/hooks/useFirebase";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function ShowFirebaseApp() {
  const { app } = useFirebase();
  return <div>Firebase App Name: {app.name}</div>;
}

export default function App() {
  return (
    <Firebase config={config}>
      <ShowFirebaseApp />
    </Firebase>
  );
}
```

### Note

- Il componente `Firebase` deve racchiudere tutti i componenti che necessitano di accedere al contesto Firebase.
- Se la configurazione non è valida o mancante, il componente lancerà un errore.