import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';

const updatePinForm = (pinObj, userId) => {
  $('#update-pin-form').html(`<h3>Update Your Pin</h3>
  <div id="success"></div>
  <form>
  <div id="error-message"></div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" value="${pinObj.name}" placeholder="Enter Name">
          </div>
          <div class="form-group">
            <label for="URL">Website Url</label>
            <input type="text" class="form-control" value="${pinObj.website}" id="website" placeholder="Enter pin Url">
          </div>
          <div class="form-group">
            <label for="image">Image Url</label>
            <input type="text" class="form-control" value="${pinObj.image}" id="image" placeholder="Enter image Url">
          </div>
            <div class="form-group">
              <label for="board">Board</label>
                <select class="form-control" id="board">
                  <option value="">Select A Board</option>
                </select>
            </div>
          <button id="update-pin-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Pin</button>
  </form>`);

  boardData.getUserBoards(userId).then((response) => {
    response.forEach((item) => {
      $('select').append(
        `<option value="${item.uid}" ${
          pinObj.boardUid === item.uid ? "selected ='selected'" : ''
        }>${item.name}</option>`
      );
    });
  });
  $('#update-pin-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val() || false,
      website: $('#website').val() || false,
      image: $('#image').val() || false,
      boardUid: $('#board').val() || false,
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html(
        '<div class="alert alert-danger" role="alert">Please complete all fields.</div>'
      );
    } else {
      $('#error-message').html('');
      pinData
        .updateAPin(data, pinObj.uid)
        .then(() => {
          $('#success-message').html(
            '<div class="alert alert-success" role="alert">Your Pin Was Updated!</div>'
          );
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);
      $('#name').val('');
      $('#website').val('');
      $('#image').val('');
      $('#board').val('');
    }
  });
};

export default { updatePinForm };
