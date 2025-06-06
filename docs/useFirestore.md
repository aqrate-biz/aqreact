## useFirestore

L’hook `useFirestore` permette di interagire facilmente con Firestore, il database NoSQL di Firebase, per leggere, scrivere, aggiornare e ascoltare documenti in tempo reale. Utilizza il contesto Firebase fornito dal componente `Firebase`.

### Props/Parametri

L’hook `useFirestore` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Firebase` più vicino nell’albero dei componenti.

### Funzionalità

Restituisce un oggetto con i seguenti metodi:

- **set(collection, docId, data)**:  
  Crea o sovrascrive un documento nella collezione specificata con i dati forniti.

- **update(collection, docId, data)**:  
  Aggiorna (merge) un documento esistente nella collezione specificata.

- **get(collection, docId)**:  
  Recupera i dati di un documento specifico. Restituisce `null` se il documento non esiste.

- **listen(collection, docId, callback)**:  
  Ascolta in tempo reale le modifiche a un documento. La callback riceve i dati aggiornati o `null` se il documento non esiste. Restituisce una funzione per annullare l’ascolto.

### Esempio d’uso

```jsx
import React, { useState } from "react";
import Firebase from "aqreact";
import { useFirestore } from "aqreact/hooks/useFirestore";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function FirestoreDemo() {
  const firestore = useFirestore();
  const [data, setData] = useState(null);

  const addDoc = () => {
    firestore.set("testCollection", "testDoc", { name: "Test", createdAt: new Date() })
      .then(() => alert("Documento aggiunto!"));
  };

  const getDoc = () => {
    firestore.get("testCollection", "testDoc")
      .then(doc => setData(doc));
  };

  React.useEffect(() => {
    const unsubscribe = firestore.listen("testCollection", "testDoc", setData);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button onClick={addDoc}>Aggiungi documento</button>
      <button onClick={getDoc}>Recupera documento</button>
      <pre>{data ? JSON.stringify(data, null, 2) : "Nessun dato"}</pre>
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <FirestoreDemo />
    </Firebase>
  );
}
```