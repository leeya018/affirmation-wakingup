import { makeAutoObservable } from "mobx";
import { modals } from "@/util";

class Modal {
  modalName = modals.success_message;
  // modalName = "";

  constructor() {
    makeAutoObservable(this);
  }

  closeModal = () => {
    this.modalName = "";
  };
  openModal = (name) => {
    this.modalName = name;
  };
}

export const ModalStore = new Modal();
