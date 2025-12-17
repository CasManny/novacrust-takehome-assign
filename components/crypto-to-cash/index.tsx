import { useUserInput } from "@/context/user-input-context";
import { AccountForm } from "../forms/account-form";
import { ApplicationForm } from "../forms/application-form";
import { UserContactForm } from "../forms/user-contact-form";
import { CryptoTransactionCard } from "./transaction-card";
import { TransactionProcessingCard } from "./transaction-processing";

const CryptoToCash = () => {
  const { step } = useUserInput();
  return (
    <section className="">
      {step === 0 && <ApplicationForm />}
      {step === 1 && <AccountForm />}
      {step === 2 && <UserContactForm />}
      {step === 3 && <CryptoTransactionCard />}
      {step === 4 && <TransactionProcessingCard />}
    </section>
  );
};

export default CryptoToCash;
