import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBJXpg_ZtmZOgJibVpl0yyIPx0N7yf3Rp8',
  authDomain: 'vis-aid.firebaseapp.com',
  databaseURL: 'https://vis-aid.firebaseio.com',
  projectId: 'vis-aid',
  storageBucket: 'vis-aid.appspot.com',
  messagingSenderId: '1013494250761',
  appId: '1:1013494250761:web:4afa82f90aabda957ce7d8',
  measurementId: 'G-XVJWPZJRNK',
};

firebase.initializeApp(firebaseConfig);
export const Auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.database();
