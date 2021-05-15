import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { login } from "../../../lib/backend-api/auth";

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: null, // If set, new users will be directed here on first sign in
  },
  providers: [
    Providers.Credentials({
      id: "backend_api",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await login(credentials);
          const { user, access_token, refresh_token } = data;
          return {
            ...user,
            access_token,
            refresh_token,
          };
        } catch (err) {
          return false;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect(url, baseUrl) {
      return "/";
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.user = {
          username: user.username,
          email: user.email,
        };
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }
      return token;
    },
    async session(session, token) {
      session = {
        user: {
          email: token.user.email,
          username: token.user.username,
        },
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };
      return session;
    },
  },
});
