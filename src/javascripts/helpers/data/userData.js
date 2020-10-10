import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/users.json`)
    .then((response) => {
      const theUsers = response.data;
      const users = [];
      if (theUsers) {
        Object.keys(theUsers).forEach((item) => {
          users.push(theUsers[item]);
        });
      }
      resolve(users);
    })
    .catch((error) => reject(error));
});

const checkIfUserExistsInFirebase = (user) => {
  axios
    .get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((resp) => {
      if (Object.values(resp.data).length === 0) {
        axios
          .post(`${baseUrl}/users.json`, user)
          .then((response) => {
            const update = { firebaseKey: response.data.name };
            axios.patch(
              `${baseUrl}/users/${response.data.name}.json`, update
            );
          })
          .catch((error) => console.warn(error));
      } else {
        console.warn('This User Already Exists');
      }

      window.sessionStorage.setItem('ua', true);
    })
    .catch((error) => console.error(error));
};

const setCurrentUser = (userObj) => {
  const user = {
    image: userObj.photURL,
    uid: userObj.uid,
    name: userObj.displayName,
    email: userObj.email,
    lastSignInTime: userObj.metadata.lastSignInTime,
  };

  const loggedIn = window.sessionStorage.getItem('ua');
  if (!loggedIn) {
    checkIfUserExistsInFirebase(user);
  }
  return user;
};

export default {
  getAllUsers,
  setCurrentUser,
};
