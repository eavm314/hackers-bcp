"use client";

import React, { createContext, useContext, useState } from "react";

import { Action, State, globalState } from "./globalState";

// initial values of context ('ctrl + .' to update them)
const StoreContext = createContext<any>({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const auth = globalState((state) => state.auth);
  const userEmail = globalState((state) => state.userEmail);

  const setAuth = globalState((state) => state.setAuth);
  const setUserEmail = globalState((state) => state.setUserEmail);

  const clearAuth = globalState((state) => state.clearAuth);
  const clearUserEmail = globalState((state) => state.clearUserEmail);

  const [ginit, setGinit] = useState<any>(null);
  const [gend, setGend] = useState<any>(null);

  const clearAll = () => {
    clearAuth();
    clearUserEmail();
  };

  return (
    <StoreContext.Provider
      value={{
        auth,
        userEmail,
        setAuth,
        setUserEmail,
        clearAuth,
        clearUserEmail,
        clearAll,
        ginit,
        gend,
        setGinit,
        setGend,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalStore = () => {
  return useContext<(State & Action) | any>(StoreContext);
};

export default StoreProvider;
