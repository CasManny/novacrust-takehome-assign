"use client";
import { PropsWithChildren } from "react";
import { UserInputProvider } from "./user-input-context";

const GlobalContextProviders = ({ children }: PropsWithChildren) => {
  return <UserInputProvider>{children}</UserInputProvider>;
};

export default GlobalContextProviders;
