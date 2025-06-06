## Log

Il componente `Log` fornisce un contesto React per la gestione centralizzata dei log dell’applicazione. Permette di registrare, visualizzare e gestire messaggi di log di diversi livelli (debug, info, warn, error) e di catturare automaticamente errori globali e promise non gestite. I log possono essere visualizzati a schermo e/o inviati alla console.

### Props/Parametri

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto di log.

- **loggers**: (array di stringhe, opzionale, default `['console']`)  
  Destinazioni dei log. Può includere `'console'` (stampa su console) e `'log'` (memorizza e visualizza nel componente).

- **levels**: (array di stringhe, opzionale, default `['error', 'warn', 'info', 'debug']`)  
  Livelli di log abilitati.

- **catchAllErrors**: (boolean, opzionale, default `true`)  
  Se `true`, cattura automaticamente errori globali e promise non gestite.

- **maxEntries**: (number, opzionale, default `1000`)  
  Numero massimo di log memorizzati internamente.

### Funzionalità

Il context fornito da `Log` espone:

- `entries`: Array dei log registrati.
- `setEntries(newEntries)`: Imposta manualmente i log.
- `addEntry(entry)`: Aggiunge un nuovo log.
- `clearEntries()`: Cancella tutti i log.
- `log(level, message, ...args)`: Registra un log di livello specifico.
- `debug(message, ...args)`: Log di livello debug.
- `info(message, ...args)`: Log di livello info.
- `warn(message, ...args)`: Log di livello warn.
- `error(message, ...args)`: Log di livello error.

L’hook [`useLog`](useLog.md) permette di accedere facilmente a queste funzionalità nei componenti figli.

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