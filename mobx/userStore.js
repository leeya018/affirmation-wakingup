import { makeAutoObservable } from "mobx";

class User {
  user = null;
  chosenDate = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user) => {
    console.log("user", user);
    this.user = user;
  };
  setChosenDate = (date) => {
    console.log("date", date);

    this.chosenDate = date;
  };
}

export const UserStore = new User();
