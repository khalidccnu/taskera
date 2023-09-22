import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.config.js";
import { setFBUnHold, setUserLoading } from "./authSlice";

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

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  }
);

// user logout
export const logOut = createAsyncThunk("auth/logOut", () => signOut(auth));
