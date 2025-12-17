"use client";
import { Button } from "@/components/ui/button";
import { useUserInput } from "@/context/user-input-context";
import { Copy } from "lucide-react";
import Image from "next/image";

export const TransactionProcessingCard = () => {
  const {  handleGoBackHome } = useUserInput()
  const transactionId = "NC123456789";
  return (
    <div className="">
      <div className="flex flex-col items-center gap-2 mb-2">
        <Image
          src={"/logo-with-text.svg"}
          alt="check-mark"
          width={150}
          height={50}
        />
        <Image
          src={"/check-circle.svg"}
          alt="check-mark"
          width={80}
          height={30}
          className="h-15 w-15 mt-10"
        />
        <p className="text-xl font-semibold text-[#000E10] text-center">
          Your transaction is processing
        </p>
      </div>

      <div className="space-y-8 text-center">
        <p className="text-muted-foreground text-sm">
          The recipient will receive it shortly.
        </p>

        <div className="flex justify-between items-center gap-1 bg-[#F7F7F7] p-2 rounded">
          <span className="text-sm text-[#4F4F4F]">Transaction ID</span>
          <div className="flex text-primary items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md font-mono text-sm">
            {transactionId}
            <button className="text-muted-foreground hover:text-primary transition">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={handleGoBackHome}
        variant="link"
        className="w-full justify-center text-base text-primary mt-10 font-bold"
      >
        Go back to home
      </Button>
    </div>
  );
};
