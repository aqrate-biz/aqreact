## Browser

Il componente `Browser` fornisce un contesto React che rileva e rende disponibile la lingua/locale del browser agli altri componenti dell’applicazione. Permette di centralizzare la gestione della localizzazione e di modificarla dinamicamente tramite context e l’hook `useLocale`.

### Props/Parametri

- **children**: (ReactNode)  
  I componenti figli che avranno accesso al contesto del browser e alla lingua rilevata.

### Funzionalità

Il context fornito da `Browser` espone:

- `locale`: La lingua/locale attualmente rilevata dal browser (es. `"it-IT"`, `"en-US"`).
- `setLocale(newLocale)`: Funzione per aggiornare manualmente la lingua/locale.

L’hook [`useLocale`](useLocale.md) permette di accedere direttamente al valore di `locale` nei componenti figli.

### Esempio d’uso

```jsx
import React from "react";
import Browser from "aqreact";
import { useLocale } from "aqreact/hooks/useLocale";

function PrintLocale() {
  const locale = useLocale();
  return (
    <div>
      <h1>Locale rilevato:</h1>
      <p>{locale}</p>
    </div>
  );
}

export default function App() {
  return (
    <Browser>
      <PrintLocale />
    </Browser>
  );
}
```