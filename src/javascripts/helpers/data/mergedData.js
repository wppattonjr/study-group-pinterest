import boardData from './boardData';
import pinData from './pinData';

const getDataForBoardsView = () => Promise((resolve, reject) => {
  boardData.getUserBoards().then((boardResponse) => {
    pinData.getBoardPins().then((pinResponse) => {
      const pinStuff = [];
      pinResponse.for((pin) => {
        const boardObject = boardResponse.find((board) => board.uid === pin.boardUid);

        const boardUse = {
          boardName: boardObject.name,
        };

        pinStuff.push({ ...pin, ...boardUse });
        resolve(pinStuff);
      });
    });
  }).catch((error) => reject(error));
});

const getSingleBoardView = (boardUid) => new Promise((resolve, reject) => {
  boardData.getSingleBoard(boardUid)
    .then((boardResponse) => {
      pinData.getBoardPins(boardResponse.uid)
        .then((pinResponse) => {
          const finalObject = { board: boardResponse, pins: pinResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

export default { getDataForBoardsView, getSingleBoardView };
