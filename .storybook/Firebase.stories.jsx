import React from 'react';
import Firebase from '../src/components/Firebase.jsx';
import User from '../src/components/User.jsx';
import FirebaseUser from '../src/components/FirebaseUser.jsx';
import { useFirebaseAnonymousAuth } from '../src/hooks/useFirebaseAnonymousAuth.jsx';


export default {
  component: Firebase,
  subcomponents: { User, FirebaseUser }
};
console.log(import.meta.env);
const config = {
    apiKey: import.meta.env.STORYBOOK_FIREBASE_APIKEY,
    authDomain: import.meta.env.STORYBOOK_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.STORYBOOK_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.STORYBOOK_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.STORYBOOK_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.STORYBOOK_FIREBASE_APPID
}


export const FirebaseApp = {
  render: (args) => (
    <div>Firebase App Initialized:
        <Firebase config={config}>
        
        </Firebase>
    </div>
  ),
};

const AnonymousAuth = () => {
    const { signIn, signOut } = useFirebaseAnonymousAuth();
    return (
        <div>
            <button onClick={signIn}>
                Sign in Anonymously
            </button>
            <button onClick={signOut}>
                Sign out
            </button>
        </div>
    )
};

const userSchema = {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string' }
};

export const FirebaseAnonymousAuth = {
    render: (args) => (
        <Firebase config={config}>
            <User userSchema={userSchema}>
                <FirebaseUser>
                    <h1>Firebase Anonymous Auth</h1>
                    <p>Click the button to login anonymously.</p>
                    <AnonymousAuth />
                </FirebaseUser>
            </User>
        </Firebase>
    )
}
