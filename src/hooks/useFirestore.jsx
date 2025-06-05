import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

import { useFirebase } from './useFirebase.jsx';

export function useFirestore() {
    const { app } = useFirebase()
    const db = getFirestore(app);
    if (!db) {
        throw new Error("Firestore is not initialized. Please provide a valid Firebase configuration.");
    }

    return {
        set: async (collection, docId, data) => {
            if (!db) {
                throw new Error("Firestore is not initialized. Please ensure Firebase app is initialized.");
            }
            const ref = doc(db, collection, docId);
            return await setDoc(ref, data)
        },
        update: async (collection, docId, data) => {
            if (!db) {
                throw new Error("Firestore is not initialized. Please ensure Firebase app is initialized.");
            }
            const ref = doc(db, collection, docId);
            return await setDoc(ref, data, { merge: true });
        },
        get: async (collection, docId) => {
            if (!db) {
                throw new Error("Firestore is not initialized. Please ensure Firebase app is initialized.");
            }
            const ref = doc(db, collection, docId);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
                return null;
            }
        },
        //delete
        //query
        listen: (collection, docId, callback) => {
            if (!db) {
                throw new Error("Firestore is not initialized. Please ensure Firebase app is initialized.");
            }
            const ref = doc(db, collection, docId);
            const unsubscribe = onSnapshot(ref, (doc) => {
                if (doc.exists()) {
                    callback(doc.data());
                } else {
                    console.log("No such document!");
                    callback(null);
                }
            });
            return unsubscribe;
        }
    }
}