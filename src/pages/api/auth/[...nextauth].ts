import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// connect db custom
import Adapters from "next-auth/adapters";

// https://next-auth.js.org/configuration/options
export default NextAuth({
  //adapter: MongoDBAdapter(clientPromise),
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      name: "Sign in with email and password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jonh@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/user/auth`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
    error: "/auth", // Error code passed in query string as ?error=
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
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    // async session({ session, token, user }) { return session },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?.email == "minimvs28@gmail.com") {
        token.userRole = "admin";
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    async signIn({ user, account, profile, isNewUser }) {},
    async createUser({ user }) {},
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
