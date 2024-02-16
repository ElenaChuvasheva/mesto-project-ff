const handleEsc = (event) => {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const renderLoading = (modalEl, isLoading) => {
  const submitButton = modalEl.querySelector("button[type='submit']");
  if (submitButton !== null) {
    if (isLoading) {
      submitButton.textContent = "Сохранение...";
    } else {
      submitButton.textContent = "Сохранить";
    }
  }
};

const handleOverlayClick = (event) => {
  if (event.target.classList.contains("popup")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEsc);
  renderLoading(modalEl, false);
};

const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
};

export { closeModal, handleOverlayClick, openModal, renderLoading };
