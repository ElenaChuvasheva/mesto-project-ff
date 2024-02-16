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

const fetchProjectUrl = (config) => {
  return fetch(config.url, {
    method: config.method === undefined ? "GET" : config.method,
    headers: apiConfig.headers,
    body: config.data === undefined ? null : JSON.stringify(config.data),
  }).then((res) => processFetchResult(res, config.errMessage));
};

const getInitialCards = () => {
  return fetchProjectUrl({
    url: apiConfig.cardsUrl,
    errMessage: "Ошибка получения карточек",
  });
};

const getCurrentUser = () => {
  return fetchProjectUrl({
    url: apiConfig.profileUrl,
    errMessage: "Ошибка получения профиля пользователя",
  });
};

const patchCurrentUser = (userData) => {
  return fetchProjectUrl({
    url: apiConfig.profileUrl,
    method: "PATCH",
    data: userData,
    errMessage: "Ошибка изменения профиля пользователя",
  });
};

const postNewCard = (cardData) => {
  return fetchProjectUrl({
    url: apiConfig.cardsUrl,
    method: "POST",
    data: cardData,
    errMessage: "Ошибка добавления новой карточки",
  });
};

const deleteCard = (cardId) => {
  return fetchProjectUrl({
    url: `${apiConfig.cardsUrl}/${cardId}`,
    method: "DELETE",
    errMessage: "Ошибка удаления карточки",
  });
};

const likeCard = (cardId) => {
  return fetchProjectUrl({
    url: `${baseUrl}/cards/likes/${cardId}`,
    method: "PUT",
    errMessage: "Ошибка добавления лайка",
  });
};

const unlikeCard = (cardId) => {
  return fetchProjectUrl({
    url: `${baseUrl}/cards/likes/${cardId}`,
    method: "DELETE",
    errMessage: "Ошибка удаления лайка",
  });
};

const patchAvatar = (urlData) => {
  return fetchProjectUrl({
    url: `${apiConfig.profileUrl}/avatar`,
    method: "PATCH",
    data: urlData,
    errMessage: "Ошибка изменения аватара пользователя",
  });
};

export {
  deleteCard,
  getCurrentUser,
  getInitialCards,
  likeCard,
  patchAvatar,
  patchCurrentUser,
  postNewCard,
  unlikeCard,
};
