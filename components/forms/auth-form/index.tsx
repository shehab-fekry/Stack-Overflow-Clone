"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ROUTES } from "@/enums";

interface IAuthFormProps<T extends FieldValues> {
  formType: "SIGN_IN" | "SIGN_UP";
  defaultValues: T;
  schema: z.ZodType<T>;
}

export function AuthForm<T extends FieldValues>({
  formType,
  defaultValues,
  schema,
}: IAuthFormProps<T>) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<T> = async (values: z.infer<typeof schema>) => {
    // Do something with the form values.
    console.log(values);
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form className="mt-10 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {Object.keys(defaultValues).map((value) => {
          return (
            <FormField
              key={value}
              control={form.control}
              name={value as Path<T>}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2.5">
                  <FormLabel className="paragraph-medium text-dark-400_light700">
                    {field.name === "email"
                      ? "Email Address"
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark-300_light700 no-focus min-h-12 rounded-1.5 border"
                      required
                      type={
                        field.name === "password"
                          ? "password"
                          : field.name === "email"
                          ? "email"
                          : "text"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Sigining In..."
              : "Signing up..."
            : buttonText}
        </Button>
        <div className="flex">
          {formType === "SIGN_IN" ? (
            <>
              <p>Create new Account?</p>

              <Link
                className="paragraph-semibold primary-text-gradient ml-1"
                href={ROUTES.SIGN_UP}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <p>Already have an account.</p>
              <Link
                className="paragraph-semibold primary-text-gradient ml-1"
                href={ROUTES.SIGN_IN}
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
