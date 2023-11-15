import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { clsx, type ClassValue } from "clsx";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
