import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBdZ1wW_Tsis9aCv242skTp5YvDGlrzIzk",
    authDomain: "aws-reinvent-2019.firebaseapp.com",
    databaseURL: "https://aws-reinvent-2019.firebaseio.com",
    projectId: "aws-reinvent-2019",
    storageBucket: "",
    messagingSenderId: "326716357877",
    appId: "1:326716357877:web:372d6d0b051ddb15"
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth();
export const database = firebase.database();