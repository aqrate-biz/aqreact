import React, { useState, useEffect } from 'react';
import Firebase from '../src/components/Firebase';
import User from '../src/components/User';
import FirebaseUser from '../src/components/FirebaseUser';
import { useFirebaseAnonymousAuth } from '../src/hooks/useFirebaseAnonymousAuth';
import { useFirestore } from '../src/hooks/useFirestore';

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

function AddToFirestore() {
    const firestore = useFirestore();
    const addData = () => {
        firestore.set('testCollection', 'test',{ name: 'Test Document', createdAt: new Date() })
            .then(() => console.log('Document added successfully'))
            .catch((error) => console.error('Error adding document:', error));
    };

    return (
        <button onClick={addData}>
            Add Document to Firestore
        </button>
    );
}
function GetFromFirestore() {
    const firestore = useFirestore();
    const [data, setData] = useState(null);
    const getData = () => {
        firestore.get('testCollection', 'test')
            .then((doc) => {
                if (doc) {
                    console.log('Document data:', doc);
                    setData(doc);
                } else {
                    console.log('No such document!');
                    setData(null);
                }
            })
            .catch((error) => console.error('Error getting document:', error));
    };

    return (
        <div>
            <button onClick={getData}>
                Get Document from Firestore
            </button>
            <h2>{data && data.name}</h2>
        </div>
    );
}

function ListenToFirestore() {
    const firestore = useFirestore();
    const [data, setData] = useState(null);

    useEffect(() => {
        const unsubscribe = listenData();
        return () => unsubscribe() //executed on component unmount
    }, []);
    const listenData = () => {
        const unsubscribe = firestore.listen('testCollection', 'test', (doc) => {
            if (doc) {
                console.log('Document data:', doc);
                setData(doc);
            } else {
                console.log('No such document!');
                setData(null);
            }
        });
        return () => unsubscribe();
    };

    return (
        <div>
            
            <h2>{data && data.name}</h2>
        </div>
    );
}



export const Firestore = {
    render: (args) => (
        <Firebase config={config}>
            <AddToFirestore />
            <GetFromFirestore />
            <ListenToFirestore />
        </Firebase>
    )
}
