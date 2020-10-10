import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardPins = (boardUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardUid"&equalTo="${boardUid}"`).then((response) => {
    const boardPins = response.data;
    const pins = [];
    if (boardPins) {
      Object.keys(boardPins).forEach((item) => {
        pins.push(boardPins[item]);
      });
    }
    resolve(pins);
  }).catch((error) => reject(error));
});

const addAPin = (data) => axios.post(`${baseUrl}/pins.json`, data).then((response) => {
  const update = { uid: response.data.name };
  axios
    .patch(`${baseUrl}/pins/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});
const getAPin = (pinUid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins/${pinUid}.json`)
    .then((response) => {
      const thePin = response.data;
      resolve(thePin);
    }).catch((error) => reject(error));
});

const deleteAPin = (pinUid) => axios.delete(`${baseUrl}/pins/${pinUid}.json`);

const updateAPin = (uid, dataObj) => axios.patch(`${baseUrl}/pins/${uid}.json`, dataObj);

export default {
  getBoardPins,
  addAPin,
  getAPin,
  deleteAPin,
  updateAPin
};
