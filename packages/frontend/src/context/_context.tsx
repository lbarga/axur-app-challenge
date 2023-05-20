import { ReactElement } from "react";
import { GlobalLoaderContextWrapper } from "./global-loader-context";

interface ContextWrapperProps {
  children: ReactElement | ReactElement[];
}

export const ContextWrapper = ({ children }: ContextWrapperProps) => (
  <GlobalLoaderContextWrapper>{children}</GlobalLoaderContextWrapper>
);
