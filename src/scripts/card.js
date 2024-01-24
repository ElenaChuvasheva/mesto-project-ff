const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

const handleLikeButton = (event) => {
  const targetClassList = event.target.classList;
  if (targetClassList.contains("card__like-button")) {
    targetClassList.toggle("card__like-button_is-active");
  }
};

const makeCard = (cardData, likeButtonCallback) => {
  const placeElementClone = placeElement.cloneNode(true);
  placeElementClone.querySelector(".card__title").textContent = cardData.name;
  const cardImage = placeElementClone.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  placeElementClone.querySelector(".card__delete-button");
  return placeElementClone;
};

const deleteCard = (event) => {
  if (event.target.classList.contains("card__delete-button")) {
    event.target.closest(".places__item").remove();
  }
};

export { deleteCard, handleLikeButton, makeCard };
