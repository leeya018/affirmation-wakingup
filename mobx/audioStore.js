import { makeAutoObservable } from "mobx"
import React, { useState, useEffect } from "react"
import { Howl } from "howler"
import { UserStore } from "./userStore"

let timesInterval = 0
class Audio {
  sound = null
  time = 0

  constructor() {
    makeAutoObservable(this)
  }
  startTime() {
    timesInterval = setInterval(() => {
      this.time += 1
    }, 1000)
  }

  stopTime() {
    clearInterval(timesInterval)
  }
  setTime(newTime) {
    this.time = newTime
  }

  setSound = (initialFileName) => {
    this.sound = new Howl({
      src: [initialFileName],
      loop: true,
    })
  }

  playSound = () => {
    this.sound.play()
  }

  stopSound = () => {
    this.sound.stop()
  }
}
export const AudioStore = new Audio()
