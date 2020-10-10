import deleteBoard from '../../helpers/data/boardData';
import showPins from '../views/pinView';

const boardMaker = (boardObject) => {
  const domstring = `<div class="card board" style="width: 18rem;" id=${boardObject.uid}>
        <img src="${boardObject.image}" class="card-img-top" alt="Card image cap">
      <div class="card-body">
          <h5 class="card-title">${boardObject.name}</h5>
          <a href="#" class="btn btn-primary display-pins" id="${boardObject.uid}">See Pins</a>
          <button id="${boardObject.uid}" class="btn btn-info update-board-btn">Update Board</button>
          <a href="#" class="btn btn-danger delete-board" id="${boardObject.uid}">Delete Board</a>
        </div>
      </div>`;

  $('body').on('click', '.delete-board', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    deleteBoard.deleteBoard(firebaseKey);
  });
  showPins.showPins();
  return domstring;
};

export default { boardMaker };
