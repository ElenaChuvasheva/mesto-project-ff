import "../pages/index.css";

import { deleteCard, likeButtonHandler, makeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { clickOverlayHandler, closeModal, openModal } from "./modal.js";

const placesList = document.querySelector(".places__list");
const imgPopup = document.querySelector(".popup_type_image"),
  profilePopup = document.querySelector(".popup_type_edit"),
  addPopup = document.querySelector(".popup_type_new-card");
const openProfilePopupButton = document.querySelector(".profile__edit-button"),
  openAddPopupButton = document.querySelector(".profile__add-button");
const popupImg = imgPopup.querySelector(".popup__image");
const popupImgCaption = imgPopup.querySelector(".popup__caption");
const profileForm = document.querySelector("[name='edit-profile']");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector("form[name='new-place']");
const newPlaceName = newPlaceForm.querySelector("input[name='place-name']");
const newPlaceUrl = newPlaceForm.querySelector("input[name='link']");

popupImg.onload = () => {
  openModal(imgPopup);
};

const zoomPhoto = (event) => {
  popupImgCaption.textContent = event.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  popupImg.src = event.target.src;
  popupImg.alt = event.target.alt;
};

initialCards.forEach((item) => {
  placesList.append(makeCard(item, deleteCard, zoomPhoto));
});

placesList.addEventListener("click", likeButtonHandler);

[imgPopup, profilePopup, addPopup].forEach((popup) => {
  let closePopupButton = popup.querySelector(".popup__close");
  closePopupButton.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("click", clickOverlayHandler);
  popup.classList.add("popup_is-animated");
});

openProfilePopupButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openModal(profilePopup);
});

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closeModal(event.target.closest(".popup"));
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

openAddPopupButton.addEventListener("click", () => {
  openModal(addPopup);
});

const handleNewPlaceFormSubmit = (event) => {
  event.preventDefault();
  closeModal(event.target.closest(".popup"));
  const cardData = { name: newPlaceName.value, link: newPlaceUrl.value };
  const newCardClone = makeCard(cardData, deleteCard, zoomPhoto);
  placesList.prepend(newCardClone);
  closeModal(event.target.closest(".popup"));
  newPlaceForm.reset();
};

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
