import { createContext, useContext } from 'react'; //  React hooks for context API
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,
  GoogleAuthProvider, signOut } from "firebase/auth"; //  Firebase Authentication
import { doc,getDoc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh7iZeyOPNeM1By4H4j3u3LXr3qYPDLt0",
  authDomain: "bookstore-45738.firebaseapp.com",
  projectId: "bookstore-45738",
  storageBucket: "bookstore-45738.firebasestorage.app",
  messagingSenderId: "158402832800",
  appId: "1:158402832800:web:1387e472381095403edcc5"
};

const app = initializeApp(firebaseConfig); //  Initialize Firebase

const firebaseAuth = getAuth(app); //  Get Auth instance
// const database = getDatabase(app); //  Get Realtime DB instance
const firestoreDb = getFirestore(app); //  Initialize Firestore
const googleProvider = new GoogleAuthProvider();


const FirebaseContext = createContext(null); //  Create Context


export const useFirebase = () => useContext(FirebaseContext); //  Custom hook to access Firebase context


export const FirebaseProvider = (props) => {
  //  Signup function using Firebase Auth
  // const signupUserWithEmailAndPassword = (email, password) => {
  //   return createUserWithEmailAndPassword(firebaseAuth, email, password);
  // };
  const signupUserWithEmailAndPassword = async (email, password, role = "user") => {
  try {
    // 1. Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    const user = userCredential.user;

    // 2. Save additional user info (like role) in Firestore
    await setDoc(doc(firestoreDb, "users", user.uid), {
      email: user.email,
      role: role,  // "user" or "admin" or any other role you want to assign
      createdAt: new Date()
    });

    return userCredential; // return userCredential if needed
  } catch (error) {
    throw error; // let caller handle the error
  }
};

  const logininUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Google sign-in/signup
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;

      // Check if user doc exists in Firestore
      const userDocRef = doc(firestoreDb, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // New user - create doc with default role "user"
        await setDoc(userDocRef, {
          email: user.email,
          role: "user",
          createdAt: new Date(),
        });
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

   const logoutUser = () => {
    return signOut(firebaseAuth);
  };


  // You can add more Firestore functions like getDoc, setDoc, updateDoc as needed

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword,logininUserWithEmailAndPassword,
    signInWithGoogle,
    logoutUser,
    firebaseAuth
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};


export {app};