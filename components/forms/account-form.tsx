"use client";

import { useUserInput } from "@/context/user-input-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DetailsHeader } from "../crypto-to-cash/details-header";
import { PaymentFrom } from "../crypto-to-cash/payment-from";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// Validation schema
const formSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  accountName: z.string().min(1, "Account name is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

export const AccountForm = () => {
  const { incrementStep, setUserInput } = useUserInput();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      accountName: "",
      paymentMethod: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setUserInput(values);
    incrementStep();
  };

  return (
    <div>
      <DetailsHeader label="Recipient details" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="recipient-label">
                  Bank
                </FormLabel>
                <FormControl className="w-full">
                  <PaymentFrom value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Account Number */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="recipient-label">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Name */}
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="recipient-label">Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="brand"
            size="brand"
            className="w-full mt-20"
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};
