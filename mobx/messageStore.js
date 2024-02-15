import { makeAutoObservable } from "mobx"

class Message {
  message = ""
  status = 0

  constructor() {
    makeAutoObservable(this)
  }

  setMessage = (msg, st) => {
    this.message = msg
    this.status = st
  }
}

export const messageStore = new Message()
