import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD-UrTPEgPuBUkGPurNiC_wcjNVK4U8U4I',
  authDomain: 'alimentando-julia.firebaseapp.com',
  databaseURL: 'https://alimentando-julia-default-rtdb.firebaseio.com',
  projectId: 'alimentando-julia',
  storageBucket: 'alimentando-julia.appspot.com',
  messagingSenderId: '623822606350',
  appId: '1:623822606350:web:05a21a0dd6f03947b6ac5f',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
