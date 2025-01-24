import { drinks } from './Drinks.js';

let randomIndex;
let gameStarted = false;

window.addEventListener('load', () => {
  startScreen();
});

function startScreen() {
  if (!gameStarted) {
    const startScreenListener = (event) => {
      const keyName = event.key;
      if (keyName === "f" || keyName === "F") {
        document.getElementById('starting-text').style.visibility = 'hidden';
        document.getElementById('starting-title').remove();
        const gameScreen = document.getElementById('game-screen').style;
        document.getElementById('money').style.visibility = 'visible';
        gameScreen.width = '80%';
        gameScreen.backgroundImage = 'url(./resources/jillroom.gif)';
        randomIndex = newOrder();
        gameStarted = true;
        document.removeEventListener("keydown", startScreenListener);
        alert(`Controls:\nQ for Aldehyde\nW for Bronson Extract\nE for Powdered Delta \nR for Flanergide\nT for Karmotrine\nA for on the rocks\nS for aged\nAnd to finalise, space to mix or enter to blend\nIf you messed an ingredient up, just press backspace to reset the drink
        \nYour new order will be in the console (ctrl+shift+i), after finishing it press F to receive another order`);
      }
    };
    document.addEventListener("keydown", startScreenListener);
  }
}

function newOrder() {
  randomIndex = Math.floor(Math.random() * drinks.length);
  console.log(`You have received a new order: \n ${drinks[randomIndex].name} \n ${`$`}${drinks[randomIndex].price} \n ${drinks[randomIndex].ingredients}`);
  addIngredients();
  return randomIndex;
}

let aldehyde = 0;
let bronson = 0;
let delta = 0;
let flanergide = 0;
let karmotrine = 0;
let onTheRocks = false;
let aged = false;
let mixed = false;
let blended = false;
let money = 0;

function addIngredients() {
  document.removeEventListener("keydown", handleUserInput);
  document.addEventListener(
    "keydown",
    handleUserInput
  );
}

function handleUserInput(event) {
  const keyName = event.key
  if (keyName === "q" || keyName === "Q") {
    aldehyde += 1;
  }
  else if (keyName === "w" || keyName === "W") {
    bronson += 1;
  }
  else if (keyName === "e" || keyName === "E") {
    delta += 1;
  }
  else if (keyName === "r" || keyName === "R") {
    flanergide += 1;
  }
  else if (keyName === "t" || keyName === "T") {
    karmotrine += 1;
  }
  else if (keyName === "a" || keyName === "A") {
    onTheRocks = true;
  }
  else if (keyName === "s" || keyName === "S") {
    aged = true;
  }
  else if (keyName === " ") {
    mixed = true;
    serveDrink();
  }
  else if (keyName === "Enter") {
    blended = true;
    serveDrink();
  }
  else if (keyName === "Backspace") {
    resetDrink();
  }
}

function serveDrink() {
  const serveDrinkArray = [aldehyde, bronson, delta, flanergide, karmotrine, onTheRocks, aged, mixed, blended];
  if (serveDrinkArray.every((value, index) => value === drinks[randomIndex].inputs[index])) {
    console.log('Alma: Thanks Jill.');
    document.addEventListener("keydown", handleFKey);
    moneyMade();
  } else {
    console.log("Alma: That...wasn't quite what I ordered, but oh well...");
  }
  document.addEventListener("keydown", handleFKey);
}

function handleFKey(event) {
  const keyName = event.key;
  if (keyName === "f" || keyName === "F") {
    document.removeEventListener("keydown", handleFKey);
    resetDrink();
    newOrder();
  }
}

function resetDrink() {
  aldehyde = 0;
  bronson = 0;
  delta = 0;
  flanergide = 0;
  karmotrine = 0;
  onTheRocks = false;
  aged = false;
  mixed = false;
  blended = false;
}

function moneyMade() {
  money += drinks[randomIndex].price;
  if (money >= 1000) {
    console.log(`You have paid your rent, $1000 have been deducted from your account.`)
    money -= 1000
  }
  document.getElementById('money').innerHTML = `$${money}`;
}