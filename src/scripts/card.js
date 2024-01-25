const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

const handleLikeButton = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

const makeCard = (cardData, callbacks) => {
  const placeElementClone = placeElement.cloneNode(true);
  const cardTitle = placeElementClone.querySelector(".card__title");
  cardTitle.textContent = cardData.name;
  const cardImage = placeElementClone.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  placeElementClone
    .querySelector(".card__delete-button")
    .addEventListener("click", callbacks.deleteCardCallback);
  placeElementClone
    .querySelector(".card__like-button")
    .addEventListener("click", callbacks.likeButtonCallback);
  cardImage.addEventListener("click", () => {
    callbacks.zoomPhotoCallback(
      cardTitle.textContent,
      cardImage.src,
      cardData.name
    );
  });
  return placeElementClone;
};

const handleDeleteCard = (event) => {
  event.target.closest(".places__item").remove();
};

export { handleDeleteCard, handleLikeButton, makeCard };
