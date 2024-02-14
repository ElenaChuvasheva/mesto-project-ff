const baseUrl = "https://nomoreparties.co/v1/wff-cohort-6";

const apiConfig = {
  cardsUrl: `${baseUrl}/cards`,
  profileUrl: `${baseUrl}/users/me`,
  headers: {
    authorization: "cd80947a-62e4-4e76-8bb9-39bdbd94fb7a",
    "Content-Type": "application/json",
  },
};

const processFetchResult = (res, errText) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${errText}: ${res.status}`);
};

const getInitialCards = () => {
  return fetch(apiConfig.cardsUrl, {
    headers: apiConfig.headers,
  }).then((res) => processFetchResult(res, "Ошибка получения карточек"));
};

const getCurrentUser = () => {
  return fetch(apiConfig.profileUrl, {
    headers: apiConfig.headers,
  }).then((res) =>
    processFetchResult(res, "Ошибка получения профиля пользователя")
  );
};

const patchCurrentUser = (userData) => {
  return fetch(apiConfig.profileUrl, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(userData),
  }).then((res) =>
    processFetchResult(res, "Ошибка изменения профиля пользователя")
  );
};

const postNewCard = (cardData) => {
  return fetch(apiConfig.cardsUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(cardData),
  }).then((res) => processFetchResult(res, "Ошибка добавления новой карточки"));
};

const deleteCard = (cardId) => {
  return fetch(`${apiConfig.cardsUrl}/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => processFetchResult(res, "Ошибка удаления карточки"));
};

export {
  deleteCard,
  getCurrentUser,
  getInitialCards,
  patchCurrentUser,
  postNewCard,
};
