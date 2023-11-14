import { makeAutoObservable, observable } from "mobx";

class Message {
  error = "";
  success = "";

  constructor() {
    makeAutoObservable(this);
  }

  setError = (value) => {
    this.error = value;
  };

  setSuccess = (value) => {
    this.success = value;
  };
}

export const MessageStore = new Message();
