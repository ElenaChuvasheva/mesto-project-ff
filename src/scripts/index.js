import "../pages/index.css";

import {
  getCurrentUser,
  getInitialCards,
  patchAvatar,
  patchCurrentUser,
  postNewCard,
} from "./api.js";
import { handleDeleteCard, handleLikeButton, makeCard } from "./card.js";
import {
  closeModal,
  handleOverlayClick,
  openModal,
  renderLoading,
} from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";

const placesList = document.querySelector(".places__list");
const imgPopup = document.querySelector(".popup_type_image"),
  profilePopup = document.querySelector(".popup_type_edit"),
  newPlacePopup = document.querySelector(".popup_type_new-card"),
  avatarEditPopup = document.querySelector(".popup_type_avatar-edit");
const openProfilePopupButton = document.querySelector(".profile__edit-button"),
  openAddPopupButton = document.querySelector(".profile__add-button"),
  openAvatarEditButton = document.querySelector(".profile__image");
const photoImgPopup = imgPopup.querySelector(".popup__image");
const captionImgPopup = imgPopup.querySelector(".popup__caption");
const profileForm = document.querySelector("[name='edit-profile']");
const profileTitle = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.querySelector("form[name='new-place']");
const newPlaceName = newPlaceForm.querySelector("input[name='place-name']");
const newPlaceUrl = newPlaceForm.querySelector("input[name='link']");
const avatarEditForm = document.querySelector("form[name='avatar']");
const avatarUrl = avatarEditForm.querySelector("input[name='avatar-link']");

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
  const userData = {
    name: profileForm.name.value,
    about: profileForm.description.value,
  };
  renderLoading(profilePopup, true);
  patchCurrentUser(userData)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeModal(profilePopup);
    });
};

const handleNewPlaceFormSubmit = (event) => {
  event.preventDefault();
  const cardData = { name: newPlaceName.value, link: newPlaceUrl.value };
  renderLoading(newPlacePopup, true);
  postNewCard(cardData)
    .then((result) => {
      const newCardClone = makeCard(result, result.owner, makeCardCallbacks);
      placesList.prepend(newCardClone);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeModal(newPlacePopup);
      newPlaceForm.reset();
    });
};

const handleAvatarEditFormSubmit = (event) => {
  event.preventDefault();
  const url = avatarUrl.value;
  renderLoading(avatarEditPopup, true);
  patchAvatar({ avatar: url })
    .then((result) => {
      profileImage.style.backgroundImage = `url(\'${result.avatar}\')`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeModal(avatarEditPopup);
      avatarEditForm.reset();
    });
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
      placesList.append(makeCard(item, profileData, makeCardCallbacks));
    });
    fillProfile(profileData);
  })
  .catch((err) => {
    console.log(err);
  });

[imgPopup, profilePopup, newPlacePopup, avatarEditPopup].forEach((popup) => {
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

openAvatarEditButton.addEventListener("click", () => {
  avatarUrl.value = "";
  clearValidation(avatarEditForm, validationConfig);
  openModal(avatarEditPopup);
});

avatarEditForm.addEventListener("submit", handleAvatarEditFormSubmit);

enableValidation(validationConfig);
