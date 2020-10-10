import form from '../forms/updateBoardForm';
import boardData from '../../helpers/data/boardData';

const updateBoardView = (uid) => {
  $('#app').html('<div class="forms" id="update-board-form"></div>');
  boardData.getSingleBoard(uid).then((response) => {
    form.updateBoardForm(response);
  });
  $('.no-boards').html('');
};

export default { updateBoardView };
