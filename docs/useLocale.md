## useLocale

L’hook `useLocale` permette di accedere facilmente alla lingua/locale rilevata dal browser tramite il contesto fornito dal componente `Browser`. È utile per adattare l’interfaccia utente alla lingua preferita dall’utente o per gestire la localizzazione dell’applicazione.

### Props/Parametri

L’hook `useLocale` non accetta parametri direttamente. Utilizza il contesto fornito dal componente `Browser` più vicino nell’albero dei componenti.

### Funzionalità

Restituisce la stringa `locale` attualmente rilevata (es. `"it-IT"`, `"en-US"`).

### Esempio d’uso

```jsx
import React from "react";
import Browser from "aqreact";
import { useLocale } from "aqreact/hooks/useLocale";

function PrintLocale() {
  const locale = useLocale();
  return (
    <div>
      <h1>Lingua rilevata:</h1>
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