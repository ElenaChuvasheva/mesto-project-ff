import "../pages/index.css";

import { deleteCard, initialCards, makeCard } from "./cards.js";
import {
  closeModal,
  openFormPopupClassesObj,
  openModal,
  openPopupClassesObj,
} from "./modal.js";

const placesList = document.querySelector(".places__list");

const zoomPhoto = (event) => {
  const imgPopup = document.querySelector(".popup_type_image");
  const popupImg = imgPopup.querySelector(".popup__image");
  popupImg.src = event.target.src;
  popupImg.alt = event.target.alt;
  popupImg.onload = () => {
    openModal(imgPopup);
  };
};

initialCards.forEach((item) => {
  placesList.append(makeCard(item, deleteCard, zoomPhoto));
});

for (let key in openPopupClassesObj) {
  let popup = document.querySelector(openPopupClassesObj[key]);
  let closePopupButton = popup.querySelector(".popup__close");
  if (key in openFormPopupClassesObj) {
    let openPopupButton = document.querySelector(key);
    openPopupButton.addEventListener("click", () => {
      openModal(popup);
    });
  }
  closePopupButton.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}
