"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z
        .string()
        .min(1, "Email is required")
        .email({ message: "Please enter a valid email address." }),
      password: z
        .string()
        .min(6, { message: "Password must be atleast 6 characters" }),
      confirmPassword: z.string().min(1, "Confirm Password is required"),
      terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept Terms and Conditions" }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/sign-up", values);
      if (response) {
        // Redirect
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex sm:items-center items-center h-full lg:grow-0">
      <div
        className="w-[450px] h-full relative bg-cover bg-center hidden md:block"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/18861865/pexels-photo-18861865/free-photo-of-yemek-pisirmek-et-kizartmak-lezzetli.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <Image
          src="/images/food-recipe-logo-white.svg"
          alt="food-recipe-logo"
          className="absolute top-8 left-6 h-14"
          width={200}
          height={50}
        />
      </div>
      <div className="flex flex-1 items-center justify-center lg:justify-start md:justify-center px-16">
        <div className="max-w-[450px]">
          <div className="flex justify-center md:hidden">
            <Image
              src="/images/food-recipe-logo.svg"
              alt="food-recipe-logo"
              className="mb-10"
              width={200}
              height={50}
            />
          </div>
          <h2 className="font-bold text-2xl mb-5 text-center lg:text-start">
            Sign up to FoodRecipe
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="font-bold">Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="6+ characters"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="font-bold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center mb-6">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="ms-3 text-xs">
                  {"I agree with FoodRecipe's Terms of Service, Privacy Policy"}
                </label>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full font-bold h-[52px] rounded-full"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-sm mt-5">
            Do you have an account?{" "}
            <Link href="/sign-in" className="font-semibold underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
