import userData from '../../helpers/data/userData';
import boardData from '../../helpers/data/boardData';

const updateBoardForm = (boardObject) => {
  $('#update-board-form').html(`
      <h2>Update This Board </h2>
      <div id="success-message"></div>
      <form>
        <div id ="error-message></div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" value="${boardObject.name}" placeholder="Bob">
        </div>
        <div class="form-group">
              <label for="image">Image Url</label>
              <input type="text" class="form-control" value="${boardObject.image}" id="image" placeholder="Enter image Url">
            </div>
            <div class="form-group">
              <label for="user">User/label>
                <select class="form-control" id="user"
                  <option value="">Select A User</option>
                </select>
            </div>
            <button id="update-board-btn" type="submit" class="btn btn-info"><i class"fas fa-plus-circle"></i> Update Board</button>
      </form>`);

  userData.getAllUsers().then((response) => {
    response.forEach((item) => {
      $('select').append(
        `<option value="{item.uid}" ${
          boardObject.useruid === item.uid ? "selected ='selected'" : ''
        }>${item.name}</option>`
      );
    });
  });
  $('#update-board-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val() || false,
      image: $('#image').val() || false,
      useruid: $('#user').val() || false,
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html(
        '<div class="alert alert-danger" role="alert">Please complete all fields</div>'
      );
    } else {
      $('#error-message').html('');
      boardData
        .updateBoard(boardObject.uid, data)
        .then(() => {
          $('#success-message').html(
            '<div class="alert alert-success" role="alert">Your Board Has Been Updated!</div>'
          );
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#success-message').html('');
      }, 3000);
      $('#name').val('');
      $('#category').val('');
      $('#user').val('');
    }
  });
};

export default { updateBoardForm };
