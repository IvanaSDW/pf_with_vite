import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);
