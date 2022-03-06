import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "@/lib/mongodb/connect";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/hash";

// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      name: "Sign in with email and password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: 'jonh@doe.com' },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const collection = (await clientPromise).db().collection("users");
        const result = await collection.findOne({ email: credentials?.email });
        
        if (!result) {
          (await clientPromise).close();
          throw new Error("No user found with the email");
        }
        const checkPassword = await verifyPassword( credentials?.password, result?.password );
        if (!checkPassword) {
          (await clientPromise).close();
          throw new Error("Password doesnt match");
        }
        (await clientPromise).close();
        return {
          id: result._id,
          email: result.email,
          name: result.name,
          image: result.image
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      return true;
    },
    redirect({ url, baseUrl   }) {
      if (url.startsWith(baseUrl)) return url
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    // async session({ session, token, user }) { return session },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.userRole = "admin";
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
});
