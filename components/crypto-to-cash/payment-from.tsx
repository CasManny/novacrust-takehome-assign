"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Command, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const paymentFromData = [
  { icon: "/metamask.svg", name: "Metamask" },
  { icon: "/rainbow.svg", name: "Rainbow" },
  { icon: "/walletconnect.svg", name: "WalletConnect" },
  {
    icon: "/other-wallet.svg",
    name: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
  },
];

interface PaymentFromProps {
  value?: string | null;
  onChange?: (value: string) => void;
}

export const PaymentFrom = ({ value, onChange }: PaymentFromProps) => {
  const [selected, setSelected] = useState<string | null>(value || null);
  const [open, setOpen] = useState(false);

  const selectedItem = useMemo(
    () => paymentFromData.find((item) => item.name === selected),
    [selected]
  );

  const filteredData = useMemo(
    () => paymentFromData.filter((item) => item.name !== selected),
    [selected]
  );

  const handleSelect = (name: string) => {
    setSelected(name);
    setOpen(false);
    onChange?.(name); 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-15 rounded-full flex justify-start gap-2"
        >
          {selectedItem ? (
            <>
              <Image
                src={selectedItem.icon}
                alt={selectedItem.name}
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <p className="truncate">{selectedItem.name}</p>
            </>
          ) : (
            <span className="text-gray-400">Select an option</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0">
        <Command className="p-2">
          <CommandList>
            {filteredData.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => handleSelect(item.name)}
                className="flex items-center gap-2 p-3"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
