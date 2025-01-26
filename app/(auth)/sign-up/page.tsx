"use client";

import { AuthForm } from "@/components/forms/auth-form";
import { SignUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      defaultValues={{ username: "", name: "", email: "", password: "" }}
      schema={SignUpSchema}
    />
  );
};

export default SignUp;
