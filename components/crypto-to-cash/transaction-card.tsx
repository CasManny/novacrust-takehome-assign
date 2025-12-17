"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Info, Loader2 } from "lucide-react";
import { DetailsHeader } from "./details-header";
import { useUserInput } from "@/context/user-input-context";

const transactionDetails = [
  {
    label: "Amount to send:",
    value: "100 ETH",
  },
  {
    label: "Network:",
    value: "ETH",
  },
  {
    label: "Wallet:",
    value: "Other",
  },
];

export const CryptoTransactionCard = () => {
  const { incrementStep } = useUserInput();
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      incrementStep();
    }, 2000);
  };

  return (
    <div>
      <DetailsHeader label="Send ETH to the address below" />

      <div className="space-y-4">
        <div className="bg-[#E6FBF2] mx-auto w-fit flex items-center justify-center px-4 py-2 rounded-full text-sm">
          4LiV4Yjbxsl6739MKghUd
          <Copy className="ml-2" />
        </div>

        <div className="grid grid-cols-1 gap-4 text-sm bg-[#F7F7F7] p-10 rounded-sm">
          {transactionDetails.map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <span className="text-[#4F4F4F]">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 text-sm p-3">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            Only send USDT to this address. Ensure the sender is on the CELO
            network otherwise you might lose your deposit.
          </span>
        </div>
      </div>

      <Button
        className="w-full mt-20"
        variant="brand"
        size="brand"
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Confirming...
          </span>
        ) : (
          "I have sent it"
        )}
      </Button>
    </div>
  );
};
