import firebase from 'firebase/app';
import 'firebase/auth';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<div id="auth">
                    <span style="font-size: 5em; color: Tomato;"></span>
                    <h1>PINTEREST</h1>
                    <button id="google-auth" class="btn btn-primary btn-lg">
                    <i class="fab fa-google"></i>oogle Login
                    </button>
                    </div>`;

  $('#app').html(domString);
  $('#google-auth').on('click', signMeIn);
};

export default { loginButton };
