import { initializeApp } from "firebase/app";
// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FS_APIKEY,
    authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FS_DATABASEURL,
    projectId: process.env.REACT_APP_FS_PROJECTID,
    storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FS_APPID
};
//파이어베이스 프로젝트 활용하여 웹 서비스를 제공받기 위한 초기화 작업
//외부에서 사용하려면 반드시 export 앞에 붙임(ES6 모듈)
export const app = initializeApp(firebaseConfig);