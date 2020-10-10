import boardView from '../../components/views/boardView';
import addBoardView from '../../components/views/addBoardView';
import updateBoard from '../../components/views/updateBoardView';
import addPinView from '../../components/views/addPinView';
import updateThePin from '../../components/views/updatePinView';

const viewHelper = (id, user, arg) => {
  $('#app').html('');
  switch (id) {
    case 'boards-link':
      return boardView.boardView(user);
    case 'add-board-link':
      return addBoardView.addBoardView();
    case 'update-board-link':
      return updateBoard.updateBoardView(arg);
    case 'add-pin-link':
      return addPinView.addPinView(user);
    case 'update-pin-link':
      return updateThePin.updatePinView(user, arg);
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view, user) => {
  viewHelper(view);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });

  $('body').on('click', '.update-board-btn', (e) => {
    const boardUid = e.currentTarget.id;
    viewHelper('update-board-link', user, boardUid);
  });
  $('body').on('click', '.update-pin-btn', (e) => {
    const pinUid = e.currentTarget.id;
    viewHelper('update-pin-link', user, pinUid);
  });
};

export default { viewListener };
