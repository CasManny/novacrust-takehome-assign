"use client";

import { useUserInput } from "@/context/user-input-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CryptoMethod } from "../crypto-to-cash/crypto-method";
import { CurrencySelector } from "../crypto-to-cash/currency-selector";
import { PaymentFrom } from "../crypto-to-cash/payment-from";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

// Validation schema
const applicationSchema = z.object({
  payMethod: z.string().min(1, "Please select a crypto method"),
  receiveCurrency: z.string().min(1, "Please select a currency"),
  payFrom: z.string().min(1, "Please select a payment source"),
  payTo: z.string().min(1, "Please select a payment destination"),
});

export const ApplicationForm = () => {
  const { incrementStep, setUserInput, userInput } = useUserInput();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      payMethod: userInput.payMethod ?? "",
      receiveCurrency: userInput.receiveCurrency ?? "",
      payFrom: "",
      payTo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof applicationSchema>) => {
    setLoading(true);
    setUserInput(values); 

    setTimeout(() => {
      setLoading(false);
      incrementStep();
    }, 2000); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
        {/* Your Pay */}
        <FormField
          control={form.control}
          name="payMethod"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-end border rounded-2xl px-5 py-3">
                <div className="space-y-2">
                  <p className="input-label">You Pay</p>
                  <p className="font-semibold text-2xl">1.0</p>
                </div>
                <FormControl>
                  <CryptoMethod value={field.value} onChange={field.onChange} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Your Received */}
        <FormField
          control={form.control}
          name="receiveCurrency"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-end border rounded-2xl px-5 py-3">
                <div className="space-y-2">
                  <p className="input-label">You Received</p>
                  <p className="font-semibold text-2xl">1.0</p>
                </div>
                <FormControl>
                  <CurrencySelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pay From */}
        <FormField
          control={form.control}
          name="payFrom"
          render={({ field }) => (
            <FormItem>
              <p className="text-primary">Pay from</p>
              <FormControl>
                <PaymentFrom value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pay To */}
        <FormField
          control={form.control}
          name="payTo"
          render={({ field }) => (
            <FormItem>
              <p className="text-primary">Pay to</p>
              <FormControl>
                <PaymentFrom value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="brand"
          size="brand"
          className="w-full mt-8"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            "Convert Now"
          )}
        </Button>
      </form>
    </Form>
  );
};
