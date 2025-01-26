"use client";

import { AuthForm } from "@/components/forms/auth-form";
import { SignInSchema } from "@/lib/validations";
import React from "react";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      defaultValues={{ email: "", password: "" }}
      schema={SignInSchema}
    />
  );
};

export default SignIn;
