"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the user input state
interface UserInput {
  accountNumber?: string;
  accountName?: string;
  paymentMethod?: string;
  email?: string;
  phone?: string;
  cryptoMethod?: string;
  currency?: string;
  payMethod?: string;
  receiveCurrency?: string;
  payFrom?: string;
  payTo?: string;
}

export type TransactionType = "cash" | "crypto" | "fiat";
const TOTAL_STEPS = 5;

interface UserInputContextProps {
  userInput: UserInput;
  step: number;
  transactionType: TransactionType;
  setUserInput: (value: Partial<UserInput>) => void;
  resetUserInput: () => void;
  handleTransactionType: (value: TransactionType) => void;
  incrementStep: () => void;
  decrementStep: () => void;
  handleGoBackHome: () => void;
}

const UserInputContext = createContext<UserInputContextProps | undefined>(
  undefined
);

export const UserInputProvider = ({ children }: { children: ReactNode }) => {
  const [userInput, setUserInputState] = useState<UserInput>({
    payMethod: "2",
    receiveCurrency: "NG",
  });
  const [transactionType, setTransactionType] =
    useState<TransactionType>("crypto");
  const [step, setStep] = useState(0);

  const handleTransactionType = (value: TransactionType) => {
    setTransactionType(value);
  };

  // Merge partial updates
  const setUserInput = (value: Partial<UserInput>) => {
    setUserInputState((prev) => ({ ...prev, ...value }));
  };

  const resetUserInput = () => setUserInputState({});

  const incrementStep = () => {
    setStep((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev));
  };

  const decrementStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleGoBackHome = () => {
    setStep(0);
  };

  return (
    <UserInputContext.Provider
      value={{
        userInput,
        step,
        setUserInput,
        resetUserInput,
        transactionType,
        handleTransactionType,
        incrementStep,
        handleGoBackHome,
        decrementStep,
      }}
    >
      {children}
    </UserInputContext.Provider>
  );
};

// Custom hook for easy access
export const useUserInput = () => {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error("useUserInput must be used within a UserInputProvider");
  }
  return context;
};
