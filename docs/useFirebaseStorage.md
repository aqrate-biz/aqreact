## useFirebaseStorage

L’hook `useFirebaseStorage` permette di interagire facilmente con Firebase Storage per caricare, scaricare, ottenere URL e cancellare file. Utilizza il contesto Firebase fornito dal componente `Firebase` e restituisce una serie di metodi utili per la gestione dei file.

### Props/Parametri

- **bucket**: (string, opzionale)  
  Nome del bucket Firebase Storage da utilizzare. Se non specificato, viene usato il bucket di default dell’app Firebase.

### Funzionalità

Restituisce un oggetto con i seguenti metodi:

- **ref(path)**: Restituisce un riferimento a un file o cartella nel bucket.
- **save(path, file, metadata)**: Carica un file (Blob, File o stringa) nel percorso specificato.
- **upload(path, file, metadata, onStateChange, onError, onCompletion)**: Carica un file con monitoraggio dello stato di avanzamento.
- **delete(path)**: Cancella un file dal percorso specificato.
- **url(path)**: Restituisce una Promise con l’URL pubblico per il download del file.
- **get(path)**: Restituisce una Promise con i byte del file scaricato.

### Esempio d’uso

```jsx
import React, { useState } from "react";
import Firebase from "aqreact";
import { useFirebaseStorage } from "aqreact/hooks/useFirebaseStorage";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

function FileUploader() {
  const storage = useFirebaseStorage();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (file) {
      await storage.save("uploads/" + file.name, file);
      const downloadUrl = await storage.url("uploads/" + file.name);
      setUrl(downloadUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Carica file</button>
      {url && <a href={url} target="_blank" rel="noopener noreferrer">Scarica file</a>}
    </div>
  );
}

export default function App() {
  return (
    <Firebase config={config}>
      <FileUploader />
    </Firebase>
  );
}
```