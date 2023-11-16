import { action, autorun, computed, makeAutoObservable, observable } from "mobx"
import { modals } from "@/util"

class ModalStore {
  modalName = ""

  // modalName = "";

  constructor() {
    makeAutoObservable(this, {
      closeModal: action,
      openModal: action,
      total: computed,
    })
  }

  closeModal = () => {
    this.modalName = ""
  }
  openModal = (name) => {
    this.modalName = name
  }
}
export const modalStore =
  typeof window !== "undefined"
    ? (window.store = new ModalStore())
    : new ModalStore()

// this run when there is a change in the store
autorun(() => {
  console.log("modalName", modalStore.modalName)
})
