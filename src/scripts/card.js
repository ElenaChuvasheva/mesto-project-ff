const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

const likeButtonHandler = (event) => {
  const targetClassList = event.target.classList;
  if (targetClassList.contains("card__like-button")) {
    targetClassList.toggle("card__like-button_is-active");
  }
};

const makeCard = (
  cardData,
  deleteButtonCallback,
  zoomPhotoCallback,
  likeButtonCallback
) => {
  const placeElementClone = placeElement.cloneNode(true);
  placeElementClone.querySelector(".card__title").textContent = cardData.name;
  const cardImage = placeElementClone.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  placeElementClone
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteButtonCallback);
  cardImage.addEventListener("click", zoomPhotoCallback);
  return placeElementClone;
};

const deleteCard = (event) => {
  event.target.closest(".places__item").remove();
};

export { deleteCard, likeButtonHandler, makeCard };