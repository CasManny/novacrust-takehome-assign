"use client";

import { cryptoMethods } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";



interface CryptoMethodProps {
  value?: string | null;
  onChange?: (value: string) => void;
}

export const CryptoMethod = ({ value, onChange }: CryptoMethodProps) => {
  const [selected, setSelected] = useState(cryptoMethods[0].id || value);
  const [open, setOpen] = useState(false);

  const selectedItem = useMemo(
    () => cryptoMethods.find((item) => item.id === selected),
    [selected]
  );

  const filteredData = useMemo(
    () => cryptoMethods.filter((item) => item.id !== selected),
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
