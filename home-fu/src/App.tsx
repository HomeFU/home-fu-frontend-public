import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home/Home";
import { Details } from "./pages/Details/Details";
import { Profile } from "./pages/Profile/Profile";
import { AdminPanel } from "./pages/AdminPanel/mainAdminPage";
import { NotFound } from "./pages/NotFound/NotFound";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { login } from "./redux/Auth/authSlice";
import { useDispatch } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyCYSW7u4h-xgul8S0WJ29SxgyhDchBGn4E",
  authDomain: "home-fu.firebaseapp.com",
  projectId: "home-fu",
  storageBucket: "home-fu.firebasestorage.app",
  messagingSenderId: "367528067901",
  appId: "1:367528067901:web:c0e4845b2ae63d6fae3b54",
  measurementId: "G-EHK9DNF54R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        dispatch(login(userData));
      } else {
        return;
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/carddetails/:id" element={<Details/>}></Route>
        <Route path="/admin-panel" element={<AdminPanel/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;