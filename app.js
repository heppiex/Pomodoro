"use strict";
const SECOND = 1000;

let pomodoroLength = 25;
let pomodoroActive = true;
let shortBreakLength = 5;
let shortBreakActive = false;
let longBreakLength = 20;
let longBreakActive = false;
let untilLongBreak = 2;
let timeLeft;
let pause = true;

const pomodoroBtn = document.getElementById("pomodoro");
const shortBreakBtn = document.getElementById("shortBreak");
const longBreakBtn = document.getElementById("longBreak");
const startBtn = document.getElementById("start");
const settingsBtn = document.querySelector("settings");
const timeField = document.getElementById("time");
const menu = document.getElementById("menu");
const title = document.getElementById("title");
const backgroundChange = document.getElementsByClassName("pomodoroBackground");
const items = menu.getElementsByTagName("li");

const timeLeftCalc = function () {
  if (pomodoroActive) timeLeft = pomodoroLength * 60;
  else if (shortBreakActive) timeLeft = shortBreakLength * 60;
  else timeLeft = longBreakLength * 60;
};

const underlineRemove = function (type) {
  for (let i = 0; i < items.length; i++) {
    if (i === type) items[i].classList.add("active");
    else items[i].classList.remove("active");
  }
};

const pomodoroReset = function () {
  pomodoroActive = true;
  longBreakActive = false;
  shortBreakActive = false;
  pause = true;

  timeLeftCalc();
  timePrinter();
  underlineRemove(0);

  startBtn.innerText = "start";
  for (let i = 0; i < backgroundChange.length; i++) {
    backgroundChange[i].style.backgroundColor = `rgba(225, 29, 72, 1)`;
  }
};

const pomodoroBtnClick = function () {
  if (timeLeft > 0 && !pause) {
    if (
      confirm(`The timer is still running, are you sure you want to switch?`) !=
      true
    )
      return;
  }
  pomodoroReset();
};

const shortBreakReset = function () {
  shortBreakActive = true;
  longBreakActive = false;
  pomodoroActive = false;
  pause = true;

  timeLeftCalc();
  timePrinter();
  underlineRemove(1);

  startBtn.innerText = "start";
  for (let i = 0; i < backgroundChange.length; i++) {
    backgroundChange[i].style.backgroundColor = `rgba(0, 116, 255, 1)`;
  }
};

const shortBreakBtnClick = function () {
  if (timeLeft > 0 && !pause) {
    if (
      confirm(`The timer is still running, are you sure you want to switch?`) !=
      true
    )
      return;
  }
  shortBreakReset();
};

const longBreakReset = function () {
  longBreakActive = true;
  shortBreakActive = false;
  pomodoroActive = false;
  pause = true;

  timeLeftCalc();
  timePrinter();
  underlineRemove(2);

  startBtn.innerText = "start";
  for (let i = 0; i < backgroundChange.length; i++) {
    backgroundChange[i].style.backgroundColor = `rgba(162, 0, 255, 1)`;
  }
};

const longBreakBtnClick = function () {
  if (timeLeft > 0 && !pause) {
    if (
      confirm(`The timer is still running, are you sure you want to switch?`) !=
      true
    )
      return;
  }
  longBreakReset();
};

const nextTimer = function () {
  const timeIsUp = new Audio("./sound/timeIsUp.mp3");
  timeIsUp.play();
  if (untilLongBreak === 0) {
    untilLongBreak = 2;
    longBreakReset();
  } else if (!shortBreakActive) {
    shortBreakReset();
  } else {
    pomodoroReset();
  }
};

const minusSecond = function () {
  if (pause) {
    return;
  }
  timeLeft--;
  timePrinter();
  if (timeLeft > 0)
    setTimeout(() => {
      minusSecond();
    }, SECOND);
  else nextTimer();
};

const timePrinter = function () {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (seconds < 10 && minutes < 10) {
    timeField.innerText = `0${minutes}:0${seconds}`;
    title.innerText = `Pomodoro - 0${minutes}:0${seconds}`;
  } else if (minutes < 10) {
    timeField.innerText = `0${minutes}:${seconds}`;
    title.innerText = `Pomodoro - 0${minutes}:${seconds}`;
  } else if (seconds < 10) {
    timeField.innerText = `${minutes}:0${seconds}`;
    title.innerText = `Pomodoro - ${minutes}:0${seconds}`;
  } else {
    timeField.innerText = `${minutes}:${seconds}`;
    title.innerText = `Pomodoro - ${minutes}:${seconds}`;
  }
};

const start = startBtn.addEventListener("click", () => {
  if (pomodoroActive) untilLongBreak--;

  if (pause) {
    startBtn.innerText = "stop";
    pause = false;
    if (longBreakActive) untilLongBreak = 2;
    setTimeout(() => {
      minusSecond();
    }, SECOND);
  } else {
    startBtn.innerText = "start";
    pause = true;
  }
});

pomodoroBtn.addEventListener("click", pomodoroBtnClick);
shortBreakBtn.addEventListener("click", shortBreakBtnClick);
longBreakBtn.addEventListener("click", longBreakBtnClick);
underlineRemove(0);
timeLeftCalc();

const closeSettings = document.getElementById("closeSettings");
const settingsBox = document.querySelector(".settingsBox");
const overlay = document.getElementById("overlay");

const openBox = function () {
  if (timeLeft > 0 && !pause) {
    if (
      confirm(
        `The timer is still running, are you sure you want to change settings?`
      ) != true
    )
      return;
    else {
      if (pomodoroActive) {
        pomodoroReset();
      } else if (shortBreakActive) {
        shortBreakReset();
      } else if (longBreakActive) {
        longBreakReset();
      }
    }
  }
  settingsBox.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeBox = function () {
  settingsBox.classList.add("hidden");
  overlay.classList.add("hidden");
};

settings.addEventListener("click", openBox);
closeSettings.addEventListener("click", closeBox);
overlay.addEventListener("click", closeBox);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !settingsBox.classList.contains("hidden")) {
    closeBox();
  }
});

const submit = document.getElementById("submit");

const submitForm = function (e) {
  e.preventDefault();

  let pomodoroSetting = document.getElementById("pomodoroSettings").value;
  let shortBreakSettings = document.getElementById("shortBreakSettings").value;
  let longBreakSettings = document.getElementById("longBreakSettings").value;
  let longIntervalSettings = document.getElementById(
    "longIntervalSettings"
  ).value;

  pomodoroLength = pomodoroSetting;
  shortBreakLength = shortBreakSettings;
  longBreakLength = longBreakSettings;
  untilLongBreak = longIntervalSettings;

  timeLeftCalc();
  timePrinter();
  closeBox();
};

submit.addEventListener("click", submitForm);
