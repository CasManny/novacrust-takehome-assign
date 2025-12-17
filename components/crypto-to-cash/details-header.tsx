import { useUserInput } from "@/context/user-input-context";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface Props {
  label: string;
}

export const DetailsHeader = ({ label }: Props) => {
  const { decrementStep } = useUserInput();
  return (
    <header className="flex mb-10">
      <button onClick={decrementStep} className="cursor-pointer">
        <ArrowLeft />
      </button>
      <h1 className="flex-1 text-center text-primary">{label}</h1>
    </header>
  );
};
