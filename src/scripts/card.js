import { deleteCard, likeCard, unlikeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");
const activeLikeClass = "card__like-button_is-active";

const userInLikes = (likes, user) => {
  return likes.some((item) => {
    return item._id === user._id;
  });
};

const handleLikeButton = (event, cardData) => {
  const button = event.target;
  const likesNumber = event.target
    .closest(".card__like")
    .querySelector(".card__like-number");
  const likeFunction = button.classList.contains(activeLikeClass)
    ? unlikeCard
    : likeCard;
  likeFunction(cardData._id)
    .then((result) => {
      likesNumber.textContent = result.likes.length;
      button.classList.toggle(activeLikeClass);
    })
    .catch((err) => {
      console.log(err);
    });
};

const makeCard = (cardData, profileData, callbacks) => {
  const placeElementClone = placeElement.cloneNode(true);
  const cardTitle = placeElementClone.querySelector(".card__title");
  const cardImage = placeElementClone.querySelector(".card__image");
  const cardLikeNumber = placeElementClone.querySelector(".card__like-number");
  const cardDeleteButton = placeElementClone.querySelector(
    ".card__delete-button"
  );
  const cardLikeButton = placeElementClone.querySelector(".card__like-button");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  cardLikeNumber.textContent = cardData.likes.length;
  if (profileData._id === cardData.owner._id) {
    cardDeleteButton.addEventListener("click", (event) => {
      callbacks.deleteCardCallback(event, cardData._id);
    });
  } else {
    cardDeleteButton.classList.add("card__delete-button_is-hidden");
  }
  if (userInLikes(cardData.likes, profileData)) {
    cardLikeButton.classList.add(activeLikeClass);
  }
  cardLikeButton.addEventListener("click", (event) => {
    callbacks.likeButtonCallback(event, cardData);
  });
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
