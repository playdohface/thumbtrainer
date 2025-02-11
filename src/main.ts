import "./style.css";

interface ModifierState {
  shiftLeft: boolean;
  shiftRight: boolean;
  ctrlLeft: boolean;
  ctrlRight: boolean;
  altLeft: boolean;
  altRight: boolean;
  metaLeft: boolean;
  metaRight: boolean;
  enter: boolean;
  space: boolean;
}

const modifierKeyNames = (() => {
  const platform = window.navigator.platform.toLowerCase();

  let ctrl = "Ctrl";
  let alt = "Alt";
  let shift = "Shift";
  let meta = "Meta";
  let enter = "Enter";
  let space = "Space";

  if (platform.indexOf("mac") !== -1) {
    alt = "Option";
    meta = "Command";
  } else if (platform.indexOf("win") !== -1) {
    meta = "Windows";
  }

  return {
    ctrl,
    alt,
    shift,
    meta,
    enter,
    space,
  };
})();

const modifierState: ModifierState = {
  shiftLeft: false,
  shiftRight: false,
  ctrlLeft: false,
  ctrlRight: false,
  altLeft: false,
  altRight: false,
  metaLeft: false,
  metaRight: false,
  enter: false,
  space: false,
};

const rootElem = document.querySelector("#app")!;

const nextKeyComboElem = document.createElement("h2");
nextRandomState(nextKeyComboElem);
const textarea = document.createElement("textarea");
textarea.rows = 4;
textarea.cols = 50;
const counterElem = document.createElement("h3");
counterElem.innerText = "0";
rootElem.appendChild(nextKeyComboElem);
rootElem.appendChild(textarea);
rootElem.appendChild(counterElem);

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "AltLeft":
      modifierState.altLeft = true;
      break;
    case "AltRight":
      modifierState.altRight = true;
      break;
    case "ControlLeft":
      modifierState.ctrlLeft = true;
      break;
    case "ControlRight":
      modifierState.ctrlRight = true;
      break;
    case "ShiftLeft":
      modifierState.shiftLeft = true;
      break;
    case "ShiftRight":
      modifierState.shiftRight = true;
      break;
    case "MetaLeft":
      modifierState.metaLeft = true;
      break;
    case "MetaRight":
      modifierState.metaRight = true;
      break;
    case "Enter":
      modifierState.enter = true;
      break;
    case "Space":
      modifierState.space = true;
      break;
  }
  update();
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "AltLeft":
      modifierState.altLeft = false;
      break;
    case "AltRight":
      modifierState.altRight = false;
      break;
    case "ControlLeft":
      modifierState.ctrlLeft = false;
      break;
    case "ControlRight":
      modifierState.ctrlRight = false;
      break;
    case "ShiftLeft":
      modifierState.shiftLeft = false;
      break;
    case "ShiftRight":
      modifierState.shiftRight = false;
      break;
    case "MetaLeft":
      modifierState.metaLeft = false;
      break;
    case "MetaRight":
      modifierState.metaRight = false;
      break;
    case "Enter":
      modifierState.enter = false;
      break;
    case "Space":
      modifierState.space = false;
      break;
  }
  update();
});

function update() {
  textarea.value = modifierStateToString(modifierState);
  if (nextKeyComboElem.innerText === textarea.value) {
    nextRandomState(nextKeyComboElem);
    counterElem.innerText = (parseInt(counterElem.innerText) + 1).toString();
  }
}

function nextRandomState(nextKeyElem: HTMLElement) {
  nextKeyElem.innerText = modifierStateToString(generateRandomModifierState());
}

function modifierStateToString(modifierState: ModifierState): string {
  let result = "";
  if (modifierState.ctrlLeft || modifierState.ctrlRight) {
    result += modifierKeyNames.ctrl + " + ";
  }
  if (modifierState.altLeft || modifierState.altRight) {
    result += modifierKeyNames.alt + " + ";
  }
  if (modifierState.shiftLeft || modifierState.shiftRight) {
    result += modifierKeyNames.shift + " + ";
  }
  if (modifierState.metaLeft || modifierState.metaRight) {
    result += modifierKeyNames.meta + " + ";
  }
  if (modifierState.enter) {
    result += modifierKeyNames.enter + " + ";
  }
  if (modifierState.space) {
    result += modifierKeyNames.space + " + ";
  }

  if (result.length > 0) {
    return result.slice(0, -3); // Remove the trailing " + "
  } else {
    return "";
  }
}

function generateRandomModifierState(): ModifierState {
  let mState = {
    shiftLeft: Math.random() < 0.5,
    shiftRight: false,
    ctrlLeft: Math.random() < 0.5,
    ctrlRight: false,
    altLeft: Math.random() < 0.5,
    altRight: false,
    metaLeft: Math.random() < 0.5,
    metaRight: false,
    enter: Math.random() < 0.5,
    space: Math.random() < 0.5,
  };
  if (mState.enter || mState.space) {
    mState.shiftLeft = false;
    mState.ctrlLeft = false;
    mState.altLeft = false;
    mState.metaLeft = false;
  }
  if (mState.space) {
    mState.enter = false;
  }
  return mState;
}
