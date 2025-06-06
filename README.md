# aqreact

Libreria di componenti React per Aqrate.

### Commands
- `npm install` - install project dependencies.
- `npm run storybook` - start local development environment.
- `npm run build` - build package into `dist/` folder.
- `npm publish` - publish your package to [npm](npmjs.com).

To test with Storybook you need to add a `.env` file with the following variables:

```
STORYBOOK_FIREBASE_APIKEY=la-tua-api-key
STORYBOOK_FIREBASE_AUTHDOMAIN=la-tua-auth-domain
STORYBOOK_FIREBASE_PROJECTID=il-tuo-project-id
STORYBOOK_FIREBASE_STORAGEBUCKET=il-tuo-storage-bucket
STORYBOOK_FIREBASE_MESSAGINGSENDERID=il-tuo-messaging-sender-id
STORYBOOK_FIREBASE_APPID=il-tuo-app-id

## Utilizzo

Importa i componenti desiderati nel tuo progetto React:

```javascript
import { NomeComponente } from 'aqreact';
```

### License
MIT license, Copyright (c) Aqrate. For more information see `LICENSE`.

## 📦 Components

- [API](docs/API.md)
- [App](docs/App.md)
- [Browser](docs/Browser.md)
- [Firebase](docs/Firebase.md)
- [FirebaseUser](docs/FirebaseUser.md)
- [Log](docs/Log.md)
- [User](docs/User.md)

## 🪝 Hooks

- [useAPI](docs/useAPI.md)
- [useApp](docs/useApp.md)
- [useDelayedValue](docs/useDelayedValue.md)
- [useFirebase](docs/useFirebase.md)
- [useFirebaseAnonymousAuth](docs/useFirebaseAnonymousAuth.md)
- [useFirebaseAuth](docs/useFirebaseAuth.md)
- [useFirebaseAuthState](docs/useFirebaseAuthState.md)
- [useFirebaseGoogleAuth](docs/useFirebaseGoogleAuth.md)
- [useFirebaseStorage](docs/useFirebaseStorage.md)
- [useFirestore](docs/useFirestore.md)
- [useLocale](docs/useLocale.md)
- [useLog](docs/useLog.md)
- [useUser](docs/useUser.md)


