import "../pages/index.css";

import { handleDeleteCard, handleLikeButton, makeCard } from "./card.js";
import { closeModal, handleOverlayClick, openModal } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import { getInitialCards, getCurrentUser } from "./api.js";

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
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector("form[name='new-place']");
const newPlaceName = newPlaceForm.querySelector("input[name='place-name']");
const newPlaceUrl = newPlaceForm.querySelector("input[name='link']");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const handleClickPhoto = (title, src, alt) => {
  captionImgPopup.textContent = title;
  photoImgPopup.src = src;
  photoImgPopup.alt = alt;
  photoImgPopup.onload = () => {
    openModal(imgPopup);
  };
};

const makeCardCallbacks = {
  deleteCardCallback: handleDeleteCard,
  likeButtonCallback: handleLikeButton,
  zoomPhotoCallback: handleClickPhoto,
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
  const newCardClone = makeCard(cardData, makeCardCallbacks);
  placesList.prepend(newCardClone);
  closeModal(newPlacePopup);
  newPlaceForm.reset();
};

const fillProfile = (profileData) => {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url(\'${profileData.avatar}\')`;
};

Promise.all([getInitialCards(), getCurrentUser()])
  .then((results) => {
    const initialCards = results[0];
    const profileData = results[1];
    initialCards.forEach((item) => {
      placesList.append(makeCard(item, makeCardCallbacks));
    });
    fillProfile(profileData);
  })
  .catch((err) => {
    console.log(err);
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
  clearValidation(profileForm, validationConfig);
  openModal(profilePopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

openAddPopupButton.addEventListener("click", () => {
  newPlaceName.value = "";
  newPlaceUrl.value = "";
  clearValidation(newPlaceForm, validationConfig);
  openModal(newPlacePopup);
});

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

enableValidation(validationConfig);
