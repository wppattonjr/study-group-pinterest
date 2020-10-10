import deleteAPin from '../../helpers/data/pinData';

const pinCreator = (pinObj) => {
  const domString = `<div class="card mb-3" id="${pinObj.uid}" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${pinObj.image}" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body view-pins">
        <h5 class="pin-title">${pinObj.name}</h5>
        <a  id="${pinObj.uid}" class="btn btn-success" target="_blank" href="${pinObj.url}">Visit Site</a>
        <button id="${pinObj.uid}" class="btn btn-info update-pin-btn">Update Pin</button>
        <button id="${pinObj.uid}" class="btn btn-danger delete-pin">Delete Pin</button>
      </div>
    </div>
  </div>
</div>`;

  $('body').on('click', '.delete-pin', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    deleteAPin.deleteAPin(firebaseKey);
  });
  return domString;
};

export default { pinCreator };
