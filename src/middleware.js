'use server'
import { NextResponse } from "next/server";
// import serviceAccount from "@/keys/serviceAccountKey.json";
import { cookies } from "next/headers";
// import admin from '../libs/firebaseAdmin';
import app, { auth } from "../libs/firebase";
// import { auth } from "./firebaseAdmin";

export const middleware = async (req, res) => {
    // const token = req.cookies.__session;
    // const { authorization } = req.headers
    // const token = cookies().get('__sessions')?.value;
    // const token = req.headers.get('authorization');

    // const { authorization } = req.headers;
    const user = auth.currentUser;
    console.log(`authorization : ${user}`);

    try {
        const decodedToken = await app.auth().verifyIdToken(authorization);
        req.user = decodedToken;
        console.log(`decodedToken: ${decodedToken}`);

        return handler(req, res);
    } catch(e) {
        console.error(`error middleware: ${e.message}`);
    }




    // const user = auth.
    // console.log(("Logs token di middleware : " + token).slice(0, 50));
    
    // if (!token) {
    // const url = req.nextUrl.clone();
    // url.pathname = "/login";
    // return NextResponse.redirect(url);
    // }
  try {
    // const cookieStore = cookies();
    //   const token = cookieStore.get('userToken')?.value;
    //   const token = cookies().get('userToken')?.value
      // await admin.auth().verifyIdToken(token);
      // console.log(`user : ${auth.currentUser?.email}`);
    
    //   const decodedToken = await auth.verifyIdToken(token);
    //   console.log(`Logs token middleware : ${decodedToken}`);


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
