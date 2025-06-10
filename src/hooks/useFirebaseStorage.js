import { getStorage, ref, uploadBytes, uploadString, getBytes, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

import { useFirebase } from './useFirebase';
import { useLogger } from './useLogger';

function check(storage) {
    if (!storage) {
        throw new Error("Firebase storage is not initialized. Please ensure Firebase app is initialized.");
    }
}

export function useFirebaseStorage(bucket) {
    const { app } = useFirebase();
    const logger = useLogger('FirebaseStorage');
    const storage = getStorage(app, bucket ? 'gs://' + bucket : undefined);
    if (!storage) {
        throw new Error("Firebase storage is not initialized. Please provide a valid Firebase configuration.");
    }

    return {
        ref: (path) => {
            check(storage);
            return ref(storage, path);
        },
        save: async (path, file, metadata) => {
            check(storage);
            const storageRef = ref(storage, path);
            try {
                if(file instanceof Blob || file instanceof File) {
                    const snapshot = await uploadBytes(storageRef, file, metadata);
                    logger.info('Uploaded file', snapshot);
                    return snapshot;
                } else if (typeof file === 'string') { //TODO tipo stringa
                    const snapshot = await uploadString(storageRef, file, 'raw', metadata);
                    logger.info('Uploaded a string', snapshot);
                    return snapshot;
                } else {
                    throw new Error("File must be a Blob, File, or string.");
                }
            } catch (error) {
                logger.error("Error uploading file:", error);
                throw error;
            }
        },
        upload: (path, file, metadata, onStateChange, onError, onCompletion) => {
            check(storage);
            const storageRef = ref(storage, path);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    if (onStateChange) {
                        logger.debug("Upload state changed:", snapshot);
                        onStateChange(snapshot);
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    logger.error("Error uploading file:", error);
                    if (onError) {
                        onError(error);
                    }
                }, 
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        logger.info('File available at', downloadURL);
                        if (onCompletion) {
                            onCompletion(downloadURL);
                        }
                    });
                }
            );
            return uploadTask;
        },
        delete: async (path) => {
            check(storage);
            const storageRef = ref(storage, path);
            try {
                await deleteObject(storageRef);
                logger.info("File deleted successfully.", path);
            } catch (error) {
                logger.error("Error deleting file:", error);
                throw error;
            }
        },
        url: async(path) => {
            check(storage);
            const storageRef = ref(storage, path);
            try {
                const url = await getDownloadURL(storageRef);
                logger.debug("Download URL:", url);
                return url;
            } catch (error) {
                logger.error("Error getting download URL:", error);
                throw error;
            }
        },
        get: async(path) => {
            check(storage);
            const storageRef = ref(storage, path);
            try {
                const bytes = await getBytes(storageRef);
                logger.info("File bytes retrieved successfully", bytes.length);
                return bytes;
            } catch (error) {
                logger.error("Error getting file:", error);
                throw error;
            }
        }

    }
}