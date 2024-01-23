import "../pages/index.css";

import { deleteCard, initialCards, makeCard } from "./cards.js";
import { closeModal, openModal, openModalClassesObj } from "./modal.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach((item) => {
  placesList.append(makeCard(item, deleteCard));
});

for (let key in openModalClassesObj) {
  let butt = document.querySelector("." + key);
  let popup = document.querySelector("." + openModalClassesObj[key]);
  butt.addEventListener("click", () => {
    openModal(popup);
  });
  let closePopupButton = popup.querySelector(".popup__close");
  closePopupButton.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      console.log(event.target);
      closeModal(popup);
    }
  });
}
