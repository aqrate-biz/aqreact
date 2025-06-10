import React from 'react';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

import { useFirebase } from './useFirebase';
import { useLogger } from './useLogger';

export function useFirestore() {
    const { app } = useFirebase()
    const logger = useLogger('Firestore');
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
            const result = await setDoc(ref, data)
            logger.debug(`Document set in collection ${collection} with ID ${docId}`, data);
            return result;
        },
        update: async (collection, docId, data) => {
            if (!db) {
                throw new Error("Firestore is not initialized. Please ensure Firebase app is initialized.");
            }
            const ref = doc(db, collection, docId);
            const result = await setDoc(ref, data, { merge: true });
            logger.debug(`Document updated in collection ${collection} with ID ${docId}`, data);
            return result;
        },
        get: async (collection, docId) => {
            if (!db) {
                throw new Error("Firestore is not initialized. Please ensure Firebase app is initialized.");
            }
            const ref = doc(db, collection, docId);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                const result = docSnap.data();
                logger.debug(`Document retrieved from collection ${collection} with ID ${docId}`, result);
                return result;
            } else {
                logger.warn("No such document!");
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
                    const result = doc.data();
                    logger.debug(`Document snapshot received from collection ${collection} with ID ${docId}`, result);
                    callback(result);
                } else {
                    logger.warn("No such document!");
                    callback(null);
                }
            });
            return unsubscribe;
        }
    }
}