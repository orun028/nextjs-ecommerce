import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { clientPromise } from "@/lib/mongodb/connect";

// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      name: "Sign in with email and password",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          type: "facebook",
          name: profile.kakao_account?.profile.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile.profile_image_url
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          type: "google",
          name: profile.kakao_account?.profile.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile.profile_image_url
        };
      },
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
    // error: '/auth/error', // Error code passed in query string as ?error=
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
    // async redirect({ url, baseUrl }) { return baseUrl },
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
