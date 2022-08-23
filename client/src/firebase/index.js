import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDBq26QHWLG1U9-z8YTCCW5KnwwkWsKnn0",
    authDomain: "blog-f48ca.firebaseapp.com",
    projectId: "blog-f48ca",
    storageBucket: "blog-f48ca.appspot.com",
    messagingSenderId: "49784739021",
    appId: "1:49784739021:web:bc055cc4c6f21b82f98584",
    measurementId: "G-Q6CVKYDJC3"
};


firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage,firebase as default };