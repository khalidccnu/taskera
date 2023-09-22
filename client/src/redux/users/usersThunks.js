import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.config.js";

// get users from firestore
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const users = [];

  const collectionRef = collection(db, "users");
  const docSnap = await getDocs(collectionRef);

  docSnap.forEach((doc) => {
    const user = {
      uid: doc.data().uid,
      displayName: doc.data().displayName,
    };

    users.push(user);
  });

  return users;
});
