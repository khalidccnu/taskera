import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../utils/firebase.config.js";
import { setFBUnHold, setUserLoading } from "./authSlice";

// create user in firestore
const createUser = async (values) => {
  const docRef = doc(db, "users", values.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return "User exist!";

  await setDoc(doc(db, "users", values.uid), {
    ...values,
    username: null,
    bio: null,
  });

  return "User inserted!";
};

// get user authentication from firebase
export const signInWithEP = createAsyncThunk(
  "auth/signInWithEP",
  async ({ values }, thunkAPI) => {
    thunkAPI.dispatch(setUserLoading(true));

    const { email, password } = values;

    const userCred = await signInWithEmailAndPassword(auth, email, password);

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  }
);

// get user google account authentication from firebase
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUserLoading(true));

    const userCred = await signInWithPopup(auth, googleProvider);
    await createUser({
      uid: userCred.user.uid,
      displayName: userCred.user.displayName,
    });

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  }
);

// create user in firebase
export const createUserWithEP = createAsyncThunk(
  "auth/createUserWithEP",
  async ({ formData }, thunkAPI) => {
    thunkAPI.dispatch(setUserLoading(true));

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await axios
      .post(`${import.meta.env.VITE_API_URL}/users/upload`, formData)
      .then((response) =>
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: response.data.filePath,
        })
      );
    await createUser({
      uid: userCred.user.uid,
      displayName: userCred.user.displayName,
    });

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  }
);

// user logout
export const logOut = createAsyncThunk("auth/logOut", () => signOut(auth));
