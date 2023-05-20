"use client";
import { createContext, ReactElement, useContext, useState } from "react";

export interface globalLoaderContextState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const GlobalLoaderContext = createContext({});

interface WrapperProps {
  children: ReactElement | ReactElement[];
}

export function GlobalLoaderContextWrapper({ children }: WrapperProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const state: globalLoaderContextState = {
    loading,
    setLoading,
  };

  return (
    <GlobalLoaderContext.Provider value={state}>
      {children}
    </GlobalLoaderContext.Provider>
  );
}

export const useGlobalLoaderContext = () => {
  return useContext(GlobalLoaderContext) as globalLoaderContextState;
};
