import { initializeApp } from "firebase/app"
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyBjMQPE7IDS86ULtAbQ0WzoyEFGu1XsTrg",
  authDomain: "biblionauta-63053.firebaseapp.com",
  projectId: "biblionauta-63053",
  storageBucket: "biblionauta-63053.firebasestorage.app",
  messagingSenderId: "173467929390",
  appId: "1:173467929390:web:329919a8d347db354f08bf",
  measurementId: "G-26B72FKM2H"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export default app