"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Please enter a valid email address." }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
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
            "url('https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
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
            Sign in to FoodRecipe
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input disabled={loading} type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full font-bold h-[52px] rounded-full"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-sm mt-5">
            {"Don't have an account? "}
            <Link href="/sign-up" className="font-semibold underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
