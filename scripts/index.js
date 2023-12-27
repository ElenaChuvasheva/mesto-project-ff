const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const placeElement = cardTemplate.querySelector('.places__item');

function makeCard(cardData, deleteButtonCallback) {
  const placeElementClone = placeElement.cloneNode(true);
  placeElementClone.querySelector('.card__title').textContent = cardData.name;
  placeElementClone.querySelector('.card__image').src = cardData.link;
  placeElementClone.querySelector('.card__image').alt = 'Пейзажное фото места ' + cardData.name;
  placeElementClone.querySelector('.card__delete-button').addEventListener('click', deleteButtonCallback);
  return placeElementClone;
}

function deleteCard(ev) {
  ev.target.parentElement.remove();
}

initialCards.forEach((item) => {    
  placesList.append(makeCard(item, deleteCard));
});
