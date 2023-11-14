import { makeAutoObservable } from "mobx";
import { navNames } from "..//util";

class Nav {
  selectedName = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedName = (name) => {
    console.log(name);
    this.selectedName = name;
  };
}

export const navStore = new Nav();
