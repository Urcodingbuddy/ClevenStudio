// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    auth_type?: "Google" | "Github";
    imageURL?: string | null;
    createdAt?: Date | null;
    lastPasswordUpdated?: Date | null;
  }

  interface Session extends DefaultSession {
    user: User & { id: string };
  }
  
interface Profile {
  avatar_url?: string;
  picture?: string;
}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}



