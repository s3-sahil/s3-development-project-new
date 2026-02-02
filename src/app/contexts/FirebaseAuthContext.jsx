// import { createContext, useEffect, useReducer } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signOut,
//   signInWithPopup,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword
// } from "firebase/auth";
// // FIREBASE CONFIGURATION
// import { firebaseConfig } from "app/config";
// // GLOBAL CUSTOM COMPONENT
// import Loading from "app/components/MatxLoading";

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const initialAuthState = {
//   user: null,
//   isInitialized: false,
//   isAuthenticated: false
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FB_AUTH_STATE_CHANGED": {
//       const { isAuthenticated, user } = action.payload;
//       return { ...state, isAuthenticated, isInitialized: true, user };
//     }

//     default: {
//       return state;
//     }
//   }
// };

// const AuthContext = createContext({
//   ...initialAuthState,
//   method: "FIREBASE"
// });

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialAuthState);

//   const signInWithEmail = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   };

//   const createUserWithEmail = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => signOut(auth);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch({
//           type: "FB_AUTH_STATE_CHANGED",
//           payload: {
//             isAuthenticated: true,
//             user: {
//               id: user.uid,
//               email: user.email,
//               avatar: user.photoURL,
//               name: user.displayName || user.email
//             }
//           }
//         });
//       } else {
//         dispatch({
//           type: "FB_AUTH_STATE_CHANGED",
//           payload: { isAuthenticated: false, user: null }
//         });
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   if (!state.isInitialized) return <Loading />;

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         logout,
//         signInWithGoogle,
//         method: "FIREBASE",
//         signInWithEmail,
//         createUserWithEmail
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useEffect, useReducer } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
// FIREBASE CONFIGURATION
import { firebaseConfig } from "app/config";
// GLOBAL CUSTOM COMPONENT
import Loading from "app/components/MatxLoading";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initial state
const initialAuthState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FB_AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext({
  ...initialAuthState,
  method: "FIREBASE",
  setUser: () => { }
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  // Firebase methods
  const signInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const createUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    dispatch({ type: "FB_AUTH_STATE_CHANGED", payload: { isAuthenticated: false, user: null } });
  };

  // Listen for Firebase auth changes AND handle custom API login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Firebase login
        dispatch({
          type: "FB_AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              email: user.email,
              avatar: user.photoURL,
              name: user.displayName || user.email
            }
          }
        });
      } else {
        // Custom API login
        const token = localStorage.getItem("token");
        const storedUser = token ? JSON.parse(localStorage.getItem("userData")) : null;

        if (token && storedUser) {
          dispatch({
            type: "FB_AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: storedUser
            }
          });
        } else {
          dispatch({
            type: "FB_AUTH_STATE_CHANGED",
            payload: { isAuthenticated: false, user: null }
          });
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!state.isInitialized) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Manual API login
        setUser: (userData) => {
          localStorage.setItem("token", userData.token);
          localStorage.setItem("userData", JSON.stringify(userData));
          dispatch({
            type: "FB_AUTH_STATE_CHANGED",
            payload: { isAuthenticated: true, user: userData }
          });
        },
        logout,
        signInWithGoogle,
        method: "FIREBASE",
        signInWithEmail,
        createUserWithEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
