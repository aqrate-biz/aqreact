## useLog

L’hook `useLog` permette di accedere facilmente al contesto di logging fornito dal componente `Log`. Consente di registrare, visualizzare e gestire messaggi di log di diversi livelli (debug, info, warn, error) e di interagire con la lista dei log memorizzati.

### Props/Parametri

L’hook `useLog` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Log` più vicino nell’albero dei componenti.

### Funzionalità

Restituisce un oggetto che espone i seguenti metodi e proprietà:

- **entries**: Array dei log registrati.
- **setEntries(newEntries)**: Imposta manualmente i log.
- **addEntry(entry)**: Aggiunge un nuovo log.
- **clearEntries()**: Cancella tutti i log.
- **log(level, message, ...args)**: Registra un log di livello specifico.
- **debug(message, ...args)**: Log di livello debug.
- **info(message, ...args)**: Log di livello info.
- **warn(message, ...args)**: Log di livello warn.
- **error(message, ...args)**: Log di livello error.

### Esempio d’uso

```jsx
import React from "react";
import Log from "aqreact";
import { useLog } from "aqreact/hooks/useLog";

function AddLogs() {
  const log = useLog();
  const addLogs = () => {
    log.log('debug', 'Questo è un messaggio di debug');
    log.warn('Questo è un warning');
    log.error('Questo è un errore');
    log.info('Questo è un messaggio informativo');
  };
  return (
    <button onClick={addLogs}>Aggiungi log</button>
  );
}

export default function App() {
  return (
    <Log loggers={['console','log']} maxEntries={10}>
      <AddLogs />
    </Log>
  );
}
```