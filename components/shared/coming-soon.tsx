"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

interface Props {
  title: string;
}

const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export const ComingSoon = ({ title }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Email submitted:", values.email);
    // TODO: send email to backend / API
  };

  return (
    <div className="w-full max-w-md mt-10 space-y-4 text-center mx-auto">
      <h1 className="text-2xl font-medium text-primary font-clashdisplay">
        Coming Soon!
      </h1>
      <p className="text-sm text-text-color">
        <span>{title}</span> is almost here. <br /> Enter your email and we’ll
        let you know the moment it’s live.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"brand"}
            size={"brand"}
            className="w-full mt-20 "
          >
            Update Me
          </Button>
        </form>
      </Form>
    </div>
  );
};
