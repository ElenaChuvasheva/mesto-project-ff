const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6",
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
  const errText = "Ошибка получения карточек";
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then((res) => processFetchResult(res, errText));
};

const getCurrentUser = () => {
  const errText = "Ошибка получения профиля пользователя";
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) => processFetchResult(res, errText));
};

export { getInitialCards, getCurrentUser };
