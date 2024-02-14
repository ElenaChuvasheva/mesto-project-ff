import { deleteCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

const handleLikeButton = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

const makeCard = (cardData, callbacks, profileData = null) => {
  const placeElementClone = placeElement.cloneNode(true);
  const cardTitle = placeElementClone.querySelector(".card__title");
  const cardImage = placeElementClone.querySelector(".card__image");
  const cardLikes = placeElementClone.querySelector(".card__like-number");
  const cardDeleteButton = placeElementClone.querySelector(
    ".card__delete-button"
  );
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  cardLikes.textContent = cardData.likes.length;
  if (profileData === null || profileData._id === cardData.owner._id) {
    cardDeleteButton.addEventListener("click", (event) => {
      callbacks.deleteCardCallback(event, cardData._id);
    });
  } else {
    cardDeleteButton.classList.add("card__delete-button_is-hidden");
  }
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

const handleDeleteCard = (event, cardId) => {
  const card = event.target.closest(".places__item");
  deleteCard(cardId)
    .then((result) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

export { handleDeleteCard, handleLikeButton, makeCard };
