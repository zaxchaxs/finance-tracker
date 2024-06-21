"use server";
import { NextResponse } from "next/server";
import { getTokenCookie } from "../libs/cookiesToken";

export const middleware = async (req) => {
  try {
    const token = await getTokenCookie();
    console.log(`authorization : ${token}`);

    if(!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Error verifying token:", error.message);
  }
};

export const config = {
  matcher: ["/dashboard/:path*", "/report/:path*", "/transaction/:path*"],
};
