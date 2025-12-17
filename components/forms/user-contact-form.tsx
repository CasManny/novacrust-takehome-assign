"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DetailsHeader } from "../crypto-to-cash/details-header";
import { useUserInput } from "@/context/user-input-context";
import { ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";

// Validation schema
const userFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{7,15}$/, "Invalid phone number"),
});

export const UserContactForm = () => {
  const { incrementStep, setUserInput } = useUserInput();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    setLoading(true);

    // Save to global context
    setUserInput(values);

    // Simulate API / processing delay
    setTimeout(() => {
      setLoading(false);
      incrementStep();
    }, 2000);
  };

  return (
    <div>
      <DetailsHeader label="Recipient details" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center gap-1 text-sm">
                      <Image
                        src="/ng.svg"
                        width={20}
                        height={20}
                        alt="country"
                        className="w-5 h-5"
                      />
                      <span>+234</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>

                    <Input
                      placeholder="000 - 000 - 00000"
                      className="pl-24"
                      {...field}
                    />
                  </div>
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
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              "Next"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
