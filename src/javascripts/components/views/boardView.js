import card from '../cards/boardCreation';
import boardData from '../../helpers/data/boardData';

const boardView = (user) => {
  $('#app').html('');
  boardData.getUserBoards(user).then((response) => {
    if (response.length) {
      response.forEach((item) => {
        $('#app').append(card.boardMaker(item));
      });
    } else {
      $('#app').append('<h2> NO BOARDS!</h2>');
    }
  });
};

export default { boardView };
