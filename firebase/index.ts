import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBcNhuqTtZU3JNRUad5aW7Vo7l9pQieZI8',
  authDomain: 'baplcp-db.firebaseapp.com',
  projectId: 'baplcp-db',
  storageBucket: 'baplcp-db.appspot.com',
  messagingSenderId: '518250903877',
  appId: '1:518250903877:web:55dc8a15ec9fb25c24662c',
}

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)
