import { NextResponse } from "next/server";
// import admin from 'firebase-admin';
import serviceAccount from "@/keys/serviceAccountKey.json";
import { cookies } from "next/headers";
import admin from '../utils/firebaseAdmin';

export const middleware = async (req) => {

  // const token = req.cookies.get('token');
  try {
      const token = cookies().get("userToken")?.value;
      console.log("Token : " + token);
    
      if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      
    // await admin.auth().verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  // return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/report/:path*", "/transaction/:path*"],
};
