import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import nav from './navBar/myNavbar';
import authData from './helpers/data/authData';
import auth from './auth/auth';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  nav.myNavbar();
};

init();
