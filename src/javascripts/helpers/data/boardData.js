import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json`)
    .then((response) => {
      const userBoards = response.data;
      const boards = [];
      if (userBoards) {
        Object.keys(userBoards).forEach((boardId) => {
          boards.push(userBoards[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const addBoard = (data) => axios
  .post(`${baseUrl}/boards.json`, data)
  .then((response) => {
    const update = { uid: response.data.name };
    axios.patch(`${baseUrl}/boards/${response.data.name}.json`, update);
  })
  .catch((error) => console.warn(error));

const getSingleBoard = (boardUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${boardUid}"`).then((response) => {
    const userBoards = Object.values(response.data);
    const thisBoard = userBoards[0];
    resolve(thisBoard);
  }).catch((error) => reject(error));
});

const updateBoard = (uid, boardObject) => axios.patch(`${baseUrl}/boards/${uid}.json`, boardObject);

const deleteBoard = (firebaseKey) => axios.delete(`${baseUrl}/boards/${firebaseKey}.json`);

export default {
  addBoard,
  getUserBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard
};
