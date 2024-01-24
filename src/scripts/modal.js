const escHandler = (event) => {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const clickOverlayHandler = (event) => {
  if (event.target.classList.contains("popup")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  document.addEventListener("keydown", escHandler);
};

const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escHandler);
};

export { clickOverlayHandler, closeModal, openModal };
