import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { env, isGoogleAuthConfigured } from "@/lib/env";
import { verifyLoginCode } from "@/lib/auth-helpers";

const credentialSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const providers: Provider[] = [
  Credentials({
    name: "Email code",
    credentials: {
      email: { label: "Email", type: "email" },
      code: { label: "Code", type: "text" },
    },
    async authorize(credentials) {
      const parsed = credentialSchema.safeParse(credentials);
      if (!parsed.success) {
        return null;
      }

      const user = await verifyLoginCode(parsed.data.email, parsed.data.code);
      if (!user || !user.email) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  }),
];

if (isGoogleAuthConfigured()) {
  providers.push(
    Google({
      clientId: env.googleClientId!,
      clientSecret: env.googleClientSecret!,
    }),
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  secret: env.authSecret,
  pages: {
    signIn: "/signin",
  },
  providers,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          subscriptionStatus: true,
        },
      });

      if (!user) {
        return token;
      }

      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
      token.subscriptionStatus = user.subscriptionStatus;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.subscriptionStatus =
          (token.subscriptionStatus as string | undefined) || "free";
      }

      return session;
    },
  },
});
