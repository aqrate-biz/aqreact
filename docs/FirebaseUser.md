## FirebaseUser

Il componente `FirebaseUser` semplifica la gestione dell’utente autenticato tramite Firebase Authentication in una app React. Si integra con il contesto Firebase fornito dal componente `Firebase` e aggiorna automaticamente lo stato utente in base agli eventi di autenticazione di Firebase.

### Props/Parametri

- **children**: (ReactNode)  
  I componenti figli che avranno accesso alle informazioni dell’utente autenticato.

### Funzionalità

- Sottoscrive automaticamente agli eventi di autenticazione di Firebase.
- Aggiorna il contesto utente (ad esempio tramite il componente `User`) quando lo stato di autenticazione cambia.
- Espone le informazioni dell’utente autenticato (come `uid`, `email`, ecc.) ai componenti figli tramite il context utente.

### Esempio d’uso

```jsx
import React from "react";
import Firebase from "aqreact";
import User from "aqreact";
import FirebaseUser from "aqreact";

const config = {
  apiKey: "la-tua-api-key",
  authDomain: "la-tua-auth-domain",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-storage-bucket",
  messagingSenderId: "il-tuo-messaging-sender-id",
  appId: "il-tuo-app-id"
};

const userSchema = {
  id: { type: "string" },
  name: { type: "string" },
  email: { type: "string" },
  role: { type: "string" }
};

function UserInfo() {
  // Puoi usare useUser() per accedere ai dati dell’utente autenticato
  // const user = useUser();
  // return <div>{user.email}</div>;
  return <div>Contenuto visibile solo se autenticato</div>;
}

export default function App() {
  return (
    <Firebase config={config}>
      <User userSchema={userSchema}>
        <FirebaseUser>
          <UserInfo />
        </FirebaseUser>
      </User>
    </Firebase>
  );
}
```

### Note

- `FirebaseUser` deve essere utilizzato come figlio di `Firebase` e (opzionalmente) di `User` per funzionare correttamente.
- Tutti i componenti figli avranno accesso alle informazioni aggiornate dell’utente autenticato tramite il context utente.