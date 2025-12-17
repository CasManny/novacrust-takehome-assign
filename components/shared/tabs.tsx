"use client";
import { useUserInput } from "@/context/user-input-context";
import { cn } from "@/lib/utils";

type TabOption = {
  id: "cash" | "crypto" | "fiat";
  label: string;
};

const options: TabOption[] = [
  { id: "crypto", label: "Crypto to cash" },
  { id: "cash", label: "Cash to crypto" },
  { id: "fiat", label: "Crypto to fiat loan" },
];

export const TransactionTypeTabs = () => {
  const { transactionType, handleTransactionType } = useUserInput();

  return (
    <div className="flex flex-col sm:flex-row gap-2 bg-muted rounded-2xl  w-full sm:w-fit mx-auto">
      {options.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleTransactionType(id)}
          className={cn(
            "w-full sm:w-auto px-4 py-3 text-sm rounded-full transition-colors font-medium",
            transactionType === id
              ? "bg-primary text-white shadow"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
