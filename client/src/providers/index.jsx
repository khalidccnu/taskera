import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider.jsx";
import IKProvider from "./IKProvider.jsx";
import DNDProvider from "./DNDProvider.jsx";
import store from "../redux/store.js";

const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <IKProvider>
          <DNDProvider>{children}</DNDProvider>
        </IKProvider>
        <AuthProvider />
      </Provider>
      <Toaster />
    </>
  );
};

export default Providers;
