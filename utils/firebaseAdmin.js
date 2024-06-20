// import admin from 'firebase-admin';
// import { initializeApp } from 'firebase-admin';
// import * as dotenv from 'dotenv';
// const serviceAccount = require('@/keys/serviceAccountKey.json')
import serviceAccount from "@/keys/serviceAccountKey.json";

// dotenv.config();
let admin;

if(typeof window === undefined) {
    const admin = require('firebase-admin');

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
    });
        
}

}

export default admin;
