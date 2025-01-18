"use client";

import { LoginValidation, UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

import { z } from "zod";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import CustomFormField from "./ui/CustomFormField";

import SubmitButton from "./SubmitButton";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createUser, loginUser } from "@/lib/actions/user.action";

export enum FormFieldType {
  INPUT = "input",
  PHONE_INPUT = "phoneInput",
  PASSWORD = "password",
}

const AuthForm = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(isLogin ? LoginValidation : UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const toggleMode = () => {
    form.reset();
    setIsLogin(!isLogin);
  };

  async function onSubmit(field: z.infer<typeof UserFormValidation>) {
    setisLoading(true);
    try {
      if (isLogin) {
        const user = await loginUser({
          email: field.email,
          password: field.password,
        });
        if (user) router.push(`/dashboard/${user.$id}`);
      } else {
        // For registration
        const user = await createUser({
          name: field.name,
          email: field.email,
          password: field.password,
          phone: field.phone,
        });
        if (user) router.push(`/dashboard/${user.$id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="text-white flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className="flex justify-center text-center flex-col gap-3">
          <h1 className="text-3xl font-bold">Welcome 👋</h1>
          <p className="text-2xl font-bold">
            {isLogin ? "Log In" : "Register"}
          </p>

          <Button // const userData = { name, email, password, phone };
            type="button"
            onClick={toggleMode}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </Button>
        </section>
        {!isLogin && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Username"
              placeholder="Sam peter"
              iconSrc="/icons/user.svg"
              iconAlt="icon"
            />
          </>
        )}

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="peter@gmail.com"
          iconSrc="icons/email.svg"
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter password"
        />

        <SubmitButton isLoading={isLoading}>
          {isLogin ? "Login" : "Register"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AuthForm;
