import "../pages/index.css";

import {
  getCurrentUser,
  getInitialCards,
  patchAvatar,
  patchCurrentUser,
  postNewCard,
} from "./api.js";
import { handleDeleteCard, handleLikeButton, makeCard } from "./card.js";
import { closeModal, handleOverlayClick, openModal } from "./modal.js";
import { renderLoading } from "./utils.js";
import { clearValidation, enableValidation } from "./validation.js";
import { validationConfig } from "./constants.js";

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

const renderLoadingPopup = (popup, isLoading) => {
  const submitButton = popup.querySelector("button[type='submit']");
  if (submitButton !== null) {
    renderLoading(submitButton, isLoading);
  }
};

const submitPopupForm = (config) => {
  const popupForm = config.popup.querySelector("form");
  config.event.preventDefault();
  renderLoadingPopup(config.popup, true);
  config
    .fetchFunction(config.data)
    .then((result) => {
      config.processResult(result);
      closeModal(config.popup);
      popupForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoadingPopup(config.popup, false);
    });
};

const handleProfileFormSubmit = (event) => {
  const userData = {
    name: profileForm.name.value,
    about: profileForm.description.value,
  };
  submitPopupForm({
    event: event,
    popup: profilePopup,
    fetchFunction: patchCurrentUser,
    data: userData,
    processResult: (result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    },
  });
};

const handleNewPlaceFormSubmit = (event) => {
  const cardData = { name: newPlaceName.value, link: newPlaceUrl.value };
  submitPopupForm({
    event: event,
    popup: newPlacePopup,
    fetchFunction: postNewCard,
    data: cardData,
    processResult: (result) => {
      const newCardClone = makeCard(
        result,
        result.owner._id,
        makeCardCallbacks
      );
      placesList.prepend(newCardClone);
    },
  });
};

const handleAvatarEditFormSubmit = (event) => {
  const urlData = { avatar: avatarUrl.value };
  submitPopupForm({
    event: event,
    popup: avatarEditPopup,
    fetchFunction: patchAvatar,
    data: urlData,
    processResult: (result) => {
      profileImage.style.backgroundImage = `url(\'${result.avatar}\')`;
    },
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
      placesList.append(makeCard(item, profileData._id, makeCardCallbacks));
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
  renderLoadingPopup(popup, false);
});

const openFormPopup = (config) => {
  const popupForm = config.popup.querySelector("form");
  if (config.refreshContent) {
    config.refreshContent();
  } else {
    popupForm.reset();
  }
  clearValidation(popupForm, validationConfig);
  openModal(config.popup);
};

openProfilePopupButton.addEventListener("click", () => {
  openFormPopup({
    popup: profilePopup,
    refreshContent: () => {
      profileForm.name.value = profileTitle.textContent;
      profileForm.description.value = profileDescription.textContent;
    },
  });
});

openAddPopupButton.addEventListener("click", () => {
  openFormPopup({
    popup: newPlacePopup,
  });
});

openAvatarEditButton.addEventListener("click", () => {
  openFormPopup({
    popup: avatarEditPopup,
  });
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
avatarEditForm.addEventListener("submit", handleAvatarEditFormSubmit);

enableValidation(validationConfig);
