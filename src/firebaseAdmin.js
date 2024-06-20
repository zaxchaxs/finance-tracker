'use server'
// import { initializeApp } from 'firebase-admin';
// import * as dotenv from 'dotenv';
// const serviceAccount = require('@/keys/serviceAccountKey.json')
import admin from 'firebase-admin';
import serviceAccount from "@/keys/serviceAccountKey.json";

// dotenv.config();
// let admin;
// const admin = require('firebase-admin');
let auth;

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
});

auth = admin.auth();
// if(typeof window === undefined) {
// }
}
export {auth};

// if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
// }

