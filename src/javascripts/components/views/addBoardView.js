import form from '../forms/boardForm';

const addBoardView = () => {
  $('#app').html('<div id=board-form></div>');
  form.boardForm();
};

export default { addBoardView };
