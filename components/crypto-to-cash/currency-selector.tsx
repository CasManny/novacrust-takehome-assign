"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Command, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { currencies } from "@/lib/constants";



interface CurrencySelectorProps {
  value?: string | null;
  onChange?: (value: string) => void;
}

export const CurrencySelector = ({
  value,
  onChange,
}: CurrencySelectorProps) => {
  const [selected, setSelected] = useState(currencies[0].name || value);
  const [open, setOpen] = useState(false);

  const selectedItem = useMemo(
    () => currencies.find((item) => item.name === selected),
    [selected]
  );

  const filteredData = useMemo(
    () => currencies.filter((item) => item.name !== selected),
    [selected]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-fit bg-[#F7F7F7] flex rounded-full items-center gap-2"
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

      <PopoverContent className="w-36 p-0">
        <Command className="p-2">
          <CommandList>
            {filteredData.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={() => {
                  setSelected(item.name);
                  setOpen(false);
                  onChange?.(item.name);
                }}
                className="flex items-center gap-2"
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
