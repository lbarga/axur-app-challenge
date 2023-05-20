"use client";
import { useGlobalLoaderContext } from "@/context/global-loader-context";
import Loader from "../loader/loader";
import { GlobalLoaderContainer } from "./global-loader-styles";

export default function GlobalLoader() {
  const globalLoaderContext = useGlobalLoaderContext();

  return (
    <>
      {globalLoaderContext.loading && (
        <GlobalLoaderContainer id="global-loader">
          <Loader />
        </GlobalLoaderContainer>
      )}
    </>
  );
}
