import { action, autorun, makeAutoObservable, observable } from "mobx";
import { modals } from "@/util";

class ModalStore {
  @observable modalName = modals.success_message;
  // modalName = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action closeModal = () => {
    this.modalName = "";
  };
  @action openModal = (name) => {
    this.modalName = name;
  };
}
const store = typeof window !== 'undefined' ? window.store = new ModalStore() : new ModalStore();
export default store;
// this run when there is a change in the store
autorun(() => {
  console.log("modalName", store.modalName);
});
