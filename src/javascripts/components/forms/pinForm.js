import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

const pinForm = (user) => {
  $('#pin-form').html(`<h3>Please Add A Pin</h3>
  <div id="success-message"></div>
  <form>
    <div id="error-message"></div>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Enter Name">
            </div>
            <div class="form-group">
            <label for="URL">Website Url</label>
            <input type="text" class="form-control" id=website placeholder="Enter pin Url">
            </div>
            <div class="form-group">
              <label for="image">Image Url</label>
              <input type="text" class="form-control" id="image" placeholder="Enter image Url">
            </div>
            <div class="form-group">
              <label for="user">Board</label>
              <select class="form-control" id="board">
                <option value="">Please Select a Board</option>
              </select>
            </div>
            <button id="add-board-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add A Pin</button>
</form>`);

  boardData.getUserBoards(user).then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}">${item.name}</option>`);
    });
  });
  $('#add-board-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val() || false,
      url: $('#website').val() || false,
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
        .addAPin(data)
        .then(() => {
          $('#success-message').html(
            '<div class="alert alert-success" role="alert">Your Pin Was Added!</div>'
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

export default { pinForm };
