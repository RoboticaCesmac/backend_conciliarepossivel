import admin from 'firebase-admin';
const serviceAccount = require("../../credencial-firebase.json");

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
}

export {
    firebaseConfig
};