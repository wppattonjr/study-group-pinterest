import pinData from '../../helpers/data/pinData';
import form from '../forms/updatePinForm';

const updatePinView = (uid, userId) => {
  $('#app').html('<div class="forms" id="update-pin-form"></div>');
  pinData.getAPin(uid).then((response) => {
    form.updatePinForm(response, userId);
  });
};

export default { updatePinView };
