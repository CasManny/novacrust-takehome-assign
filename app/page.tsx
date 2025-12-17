"use client";
import CashToCrypto from "@/components/cash-to-cypto";
import CryptoToFiatLoan from "@/components/crypto-fiat-loan";
import CryptoToCash from "@/components/crypto-to-cash";
import { TransactionTypeTabs } from "@/components/shared/tabs";
import { useUserInput } from "@/context/user-input-context";

const HomePage = () => {
  const { transactionType, step } = useUserInput();
  return (
    <main className="max-w-xl w-full mx-auto min-h-screen bg-white border rounded-2xl my-10 p-10">
      {step < 1 && <TransactionTypeTabs />}
      {transactionType === "crypto" && <CryptoToCash />}
      {transactionType === "cash" && <CashToCrypto />}
      {transactionType === "fiat" && <CryptoToFiatLoan />}
    </main>
  );
};

export default HomePage;
