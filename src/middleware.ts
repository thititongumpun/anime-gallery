import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.role === "ADMIN"
      }
      // `/me` only requires the user to be logged in
      // return !!token
      return true
    },
  },
})

export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico|/admin/:path*).*)"],
};
