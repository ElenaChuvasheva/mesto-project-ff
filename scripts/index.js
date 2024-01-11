const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const placeElement = cardTemplate.querySelector(".places__item");

function makeCard(cardData, deleteButtonCallback) {
  const placeElementClone = placeElement.cloneNode(true);
  placeElementClone.querySelector(".card__title").textContent = cardData.name;
  const cardImage = placeElementClone.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;
  placeElementClone
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteButtonCallback);
  return placeElementClone;
}

function deleteCard(ev) {
  ev.target.closest(".places__item").remove();
}

initialCards.forEach((item) => {
  placesList.append(makeCard(item, deleteCard));
});
