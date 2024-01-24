import "../pages/index.css";

import { deleteCard, handleLikeButton, makeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { closeModal, handleOverlayClick, openModal } from "./modal.js";

const placesList = document.querySelector(".places__list");
const imgPopup = document.querySelector(".popup_type_image"),
  profilePopup = document.querySelector(".popup_type_edit"),
  newPlacePopup = document.querySelector(".popup_type_new-card");
const openProfilePopupButton = document.querySelector(".profile__edit-button"),
  openAddPopupButton = document.querySelector(".profile__add-button");
const photoImgPopup = imgPopup.querySelector(".popup__image");
const captionImgPopup = imgPopup.querySelector(".popup__caption");
const profileForm = document.querySelector("[name='edit-profile']");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector("form[name='new-place']");
const newPlaceName = newPlaceForm.querySelector("input[name='place-name']");
const newPlaceUrl = newPlaceForm.querySelector("input[name='link']");

const zoomPhoto = (title, src) => {
  captionImgPopup.textContent = title;
  photoImgPopup.src = src;
  photoImgPopup.onload = () => {
    openModal(imgPopup);
  };
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closeModal(profilePopup);
};

const handleNewPlaceFormSubmit = (event) => {
  event.preventDefault();
  const cardData = { name: newPlaceName.value, link: newPlaceUrl.value };
  const newCardClone = makeCard(
    cardData,
    deleteCard,
    handleLikeButton,
    zoomPhoto
  );
  placesList.prepend(newCardClone);
  closeModal(newPlacePopup);
  newPlaceForm.reset();
};

initialCards.forEach((item) => {
  placesList.append(makeCard(item, deleteCard, handleLikeButton, zoomPhoto));
});

[imgPopup, profilePopup, newPlacePopup].forEach((popup) => {
  const closePopupButton = popup.querySelector(".popup__close");
  closePopupButton.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("click", handleOverlayClick);
  popup.classList.add("popup_is-animated");
});

openProfilePopupButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openModal(profilePopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

openAddPopupButton.addEventListener("click", () => {
  openModal(newPlacePopup);
});

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
