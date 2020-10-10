import pins from '../../helpers/data/pinData';
import pinCreator from '../cards/pinCreation';

const showPins = () => {
  $('body').on('click', '.display-pins', (e) => {
    e.stopImmediatePropagation();
    $('#app').html('');
    pins.getBoardPins(e.currentTarget.id).then((response) => {
      const newObj = response;
      const newArray = [];
      Object.keys(newObj).forEach((item) => {
        newArray.push(newObj[item]);
      });
      newArray.forEach((item) => {
        $('#app').append(pinCreator.pinCreator(item));
      });
    });
  });
};

export default { showPins };
