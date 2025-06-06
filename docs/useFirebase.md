## useFirebase

L’hook `useFirebase` permette di accedere facilmente al contesto Firebase fornito dal componente `Firebase`. Consente di ottenere l’istanza Firebase inizializzata e di interagire con essa nei componenti figli.

### Props/Parametri

L’hook `useFirebase` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Firebase` più vicino nell’albero dei componenti.

### Funzionalità

Restituisce un oggetto che include:

- **app**: L’istanza Firebase inizializzata.
- **setApp(newApp)**: Funzione per aggiornare manualmente l’istanza Firebase.

Queste proprietà permettono di accedere a tutte le API di Firebase tramite l’oggetto `app`.

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
  return (
    <div>
      <p>Firebase App Name: {app.name}</p>
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <ShowFirebaseApp />
    </Firebase>
  );
}
```