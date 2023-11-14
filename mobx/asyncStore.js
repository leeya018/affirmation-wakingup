import { makeAutoObservable } from "mobx";

class Async {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };
}

export const AsyncStore = new Async();
