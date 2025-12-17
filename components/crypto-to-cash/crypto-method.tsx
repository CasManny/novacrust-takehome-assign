"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const data = [
  { icon: "/eth.svg", name: "ETH", id: "1" },
  { icon: "/bnb.svg", name: "USDT - BNB", id: "2" },
  { icon: "/celo.svg", name: "USDT - CELO", id: "3" },
  { icon: "/ton.svg", name: "USDT - TON", id: "4" },
];

interface CryptoMethodProps {
  value?: string | null;
  onChange?: (value: string) => void;
}

export const CryptoMethod = ({ value, onChange }: CryptoMethodProps) => {
  const [selected, setSelected] = useState(data[0].id || value);
  const [open, setOpen] = useState(false);

  const selectedItem = useMemo(
    () => data.find((item) => item.id === selected),
    [selected]
  );

  const filteredData = useMemo(
    () => data.filter((item) => item.id !== selected),
    [selected]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-fi bg-[#F7F7F7] flex gap-2 rounded-full"
        >
          {selectedItem && (
            <>
              <Image
                src={selectedItem.icon}
                alt={selectedItem.name}
                width={20}
                height={20}
                className="w-5 h-5"
              />
              {selectedItem.name}
              <ChevronDown />
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-0 rounded-xl!">
        <Command className="p-2  rounded-2xl">
          <CommandInput placeholder="Search crypto..." />
          <CommandList className="space-y-5">
            {filteredData.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  setSelected(item.id);
                  setOpen(false);
                  onChange?.(item.id);
                }}
                className="flex items-center gap-2 py-3"
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
