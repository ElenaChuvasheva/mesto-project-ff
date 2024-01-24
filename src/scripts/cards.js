const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

const initialCards = [
  {
    name: "Карачаевск",
    link: new URL("../images/card_1.jpg", import.meta.url),
  },
  {
    name: "Эльбрус",
    link: new URL("../images/card_2.jpg", import.meta.url),
  },
  {
    name: "Домбай",
    link: new URL("../images/card_3.jpg", import.meta.url),
  },
];

const makeCard = (cardData, deleteButtonCallback, zoomPhotoCallback) => {
  const placeElementClone = placeElement.cloneNode(true);
  placeElementClone.querySelector(".card__title").textContent = cardData.name;
  const cardImage = placeElementClone.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  placeElementClone
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteButtonCallback);
  cardImage.addEventListener("click", zoomPhotoCallback);
  return placeElementClone;
};

const deleteCard = (event) => {
  event.target.closest(".places__item").remove();
};

export { deleteCard, initialCards, makeCard };
