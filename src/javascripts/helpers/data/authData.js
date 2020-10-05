import firebase from 'firebase/app';
import 'firebase/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').addClass('hide');
      $('#boards').removeClass('hide');
      $('home').addClass('hide');
      $('#navbar-logout-button').removeClass('hide');
    } else {
      $('#navbar-logout-button').addClass('hide');
      $('#auth').removeClass('hide');
      $('#home').removeClass('hide');
      $('#boards').addClass('hide');
    }
  });
};

export default { checkLoginStatus };
