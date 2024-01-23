const generateEscHandler = (modalEl) => {
  const handler = (event) => {
    if (event.key === "Escape") {
      closeModal(modalEl);
    }
    console.log(event.key);
  };
  return handler;
};

const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  modalEl.escHandler = generateEscHandler(modalEl);
  document.addEventListener("keydown", modalEl.escHandler);
};

const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", modalEl.escHandler);
  delete modalEl.escHandler;
  console.log("escHandler" in modalEl);
};

const openModalClassesObj = {
  "profile__add-button": "popup_type_new-card",
  "profile__edit-button": "popup_type_edit",
};

export { closeModal, openModal, openModalClassesObj };
