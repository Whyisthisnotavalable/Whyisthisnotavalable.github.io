var game = {
  alpha: 0,
  totalAlpha: 0,
  totalClicks: 0,
  clickValue: 1,
  version: 0.2,

  addToScore: function (amount) {
    this.alpha += amount;
    this.totalAlpha += amount;
    display.updateAlpha();
  },

  getAlphaPerSecond: function () {
    var alphaPerSecond = 0;
    for (var i = 0; i < building.name.length; i++) {
      alphaPerSecond += building.income[i] * building.count[i];
    }
      return alphaPerSecond;
  },
};
var building = {
  name: [
    "autoclickers",
    "superclickers",
    "megaclickers",
    "ultraclickers",
    "hyperclickers",
  ],

  count: [0, 0, 0, 0, 0],

  income: [1, 15, 155, 1555, 15555],
  cost: [15, 155, 1555, 15555, 155555],

  purchase: function (index) {
    if (game.alpha >= this.cost[index]) {
      game.alpha -= this.cost[index];
      this.count[index]++;
      this.cost[index] = Math.ceil(this.cost[index] * 1.50);
      display.updateAlpha();
      display.updateShop();
      display.updateUpgrades();
    } else {
      console.log("U are too poor");
    }
  },
};
var upgrade = {
  name: ["basic tweak", "standard tweak", "advanced tweak", "hacker tweak", "cursor on fire", "XInfinity????"],
  description: [
    "Autoclickers are now twice as efficient",
    "Superclickers are now twice as efficient",
    "Megaclickers are now twice as efficient",
    "Ultraclickers are now twice as efficient",
    "Your click is now 10X more efficient",
    "Your click is now 10000X more efficient"
  ],
  type: ["building", "building", "building","building", "click", "click"],
  cost: [300, 1700, 13000, 30000, 10000, 1000000],
  buildingIndex: [0, 1, 2, 3, -1, -1],
  requirement: [1, 5, 5, 5, 500, 5000],
  bonus: [2, 2, 2, 2, 10, 10000],
  purchased: [false, false, false, false, false, false],

  purchase: function (index) {
    if (!this.purchased[index] && game.alpha >= this.cost[index]) {
      if (
        this.type[index] == "building" &&
        building.count[this.buildingIndex[index]] >= this.requirement[index]
      ) {
        game.alpha -= this.cost[index];
        building.income[this.buildingIndex[index]] *= this.bonus[index];
        this.purchased[index] = true;

        display.updateUpgrades();
        display.updateAlpha();
      } else if (
        this.type[index] == "click" &&
        game.totalClicks >= this.requirement[index]
      ) {
        game.alpha -= this.cost[index];
        game.clickValue *= this.bonus[index];
        this.purchased[index] = true;

        display.updateUpgrades();
        display.updateAlpha();
      }
    }
  },
};

var achievement = {
  name: ["A humble start", "Still a noob", "And always will be"],
  description: [
    "Create 1 Alpha",
    "Buy 1 Autoclicker",
    "Click the Alpha 1 time",
  ],
  type: ["alpha", "building", "click"],
  requirement: [1, 1, 1],
  objectIndex: [-1, 0, -1],
  awarded: [false, false, false],

  earn: function (index) {
    this.awarded[index] = true;
  },
};

var display = {
  updateAlpha: function () {
    document.getElementById("alpha").innerHTML = game.alpha;
    document.title = game.alpha + " Alpha - Omega Clickers";
    document.getElementById("aps").innerHTML = game.getAlphaPerSecond();
  },

  updateShop: function () {
    document.getElementById("storeContainer").innerHTML = "";
    for (var i = 0; i < building.name.length; i++) {
      document.getElementById("storeContainer").innerHTML +=
        '<table class="storeButton" onclick="building.purchase(' +
        i +
        ')"><tr><td       id="nameAndCost"><p>' +
        building.name[i] +
        '</p><p><span id="cursorCost">' +
        building.cost[i] +
        '</span> Alpha</p></td><td id="amount"><span id="autoClickers">' +
        building.count[i] +
        "</span></td></tr></table>";
    }
  },
  updateUpgrades: function () {
    document.getElementById("upgradesContainer").innerHTML = "";
    for (var i = 0; i < upgrade.name.length; i++) {
      if (!upgrade.purchased[i]) {
        if (
          upgrade.type[i] == "building" &&
          building.count[upgrade.buildingIndex[i]] > upgrade.requirement[i]
        ) {
          document.getElementById("upgradesContainer").innerHTML +=
            '<img class="tooltip" src="https://cdn.glitch.global/866c4287-dbb9-40bb-81d8-737652882677/cursorXD-removebg-preview.png?v=1658186230865" title="' +
            upgrade.name[i] +
            " &#10; " +
            upgrade.description[i] +
            " &#10; (" +
            upgrade.cost[i] +
            ' alpha)" onclick="upgrade.purchase(' +
            i +
            ')">';
        } else if (
          upgrade.type[i] == "click" &&
          game.totalClicks >= upgrade.requirement[i]
        ) {
          document.getElementById("upgradesContainer").innerHTML +=
            '<img class="tooltip" src="https://cdn.glitch.global/866c4287-dbb9-40bb-81d8-737652882677/cursorXD-removebg-preview.png?v=1658186230865" title="' +
            upgrade.name[i] +
            " &#10; " +
            upgrade.description[i] +
            " &#10; (" +
            upgrade.cost[i] +
            ' alpha)" onclick="upgrade.purchase(' +
            i +
            ')">';
        }
      }
    }
  },
  updateAchievements: function () {
    document.getElementById("achievementContainer").innerHTML = "";
    for (var i = 0; i < achievement.name.length; i++) {
      if(achievement.awarded[i]) {
      document.getElementById("achievementContainer").innerHTML += '<img class="achieve" src="https://cdn.glitch.global/866c4287-dbb9-40bb-81d8-737652882677/achievement-removebg-preview%20(1).png?v=1658197363435" title="' +achievement.name[i] +" &#10; " + achievement.description[i] + ' &#10;">';
      }
    }
  },
};
function saveGame() {
  console.log("Game Saved")
  var gameSave = {
    alpha: game.alpha,
    totalClicks: game.totalClicks,
    totalAlpha: game.totalAlpha,
    clickValue: game.clickValue,
    version: game.version,
    buildingCount: building.count,
    buildingIncome: building.income,
    buildingCost: building.cost,
    upgradePurchased: upgrade.purchased,
    achievementAwarded: achievement.awarded,
  };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}
function loadGame() {
  var savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (localStorage.getItem("gameSave") !== null) {
    if (typeof savedGame.alpha !== "undefined") game.alpha = savedGame.alpha;
    if (typeof savedGame.totalAlpha !== "undefined")
      game.totalAlpha = savedGame.totalAlpha;
    if (typeof savedGame.totalClicks !== "undefined")
      game.totalClicks = savedGame.totalClicks;
    if (typeof savedGame.clickValue !== "undefined")
      game.clickValue = savedGame.clickValue;
    if (typeof savedGame.buildingCount !== "undefined") {
      for (var i = 0; i < savedGame.buildingCount.length; i++) {
        building.count[i] = savedGame.buildingCount[i];
      }
    }
    if (typeof savedGame.buildingIncome !== "undefined") {
      for (var i = 0; i < savedGame.buildingIncome.length; i++) {
        building.income[i] = savedGame.buildingIncome[i];
      }
    }
    if (typeof savedGame.buildingCost !== "undefined") {
      for (var i = 0; i < savedGame.buildingCost.length; i++) {
        building.cost[i] = savedGame.buildingCost[i];
      }
    }
    if (typeof savedGame.upgradePurchased !== "undefined") {
      for (var i = 0; i < savedGame.upgradePurchased.length; i++) {
        upgrade.purchased[i] = savedGame.upgradePurchased[i];
      }
    }
    if (typeof savedGame.achievementAwarded !== "undefined") {
      for (var i = 0; i < savedGame.achievementAwarded.length; i++) {
        achievement.awarded[i] = savedGame.achievementAwarded[i];
      }
    }
  }
}
function resetgame() {
  // if (confirm("Are u sure you want to reset?")) {
  var gameSave = {};
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
  localStorage.clear();
  location.reload();
  // }
}

document.getElementById("clicker").addEventListener(
  "click",
  function () {
    game.totalClicks++;
    game.addToScore(game.clickValue);
    createNumberOnClicker(event);
  },
  false
);

window.onload = function () {
  loadGame();
  display.updateAlpha();
  display.updateShop();
  display.updateAchievements();
  display.updateUpgrades();
};

function fadeOut(element, duration, finalOpacity, callback) {
  let opacity = 1;

  let elementFadingInterval = window.setInterval(function () {
    opacity -= 50 / duration;

    if (opacity <= finalOpacity) {
      clearInterval(elementFadingInterval);

      callback();
    }
    element.style.opacity = opacity;
  }, 50);
}
function createNumberOnClicker(event) {
  let clicker = document.getElementById("clicker");
  let clickeroffset = clicker.getBoundingClientRect();

  let position = {
    x: event.pageX - clickeroffset.left,
    y: event.pageY - clickeroffset.top,
  };

  let element = document.createElement("div");
  element.textContent = "+" + game.clickValue;
  element.classList.add("number");
  element.style.left = position.x + "px";
  element.style.top = position.y + "px";
  clicker.appendChild(element);

  let movementInterval = window.setInterval(function () {
    if (typeof element == "undefined" && element == null)
      clearInterval(movementInterval);
    position.y--;
    element.style.top = position.y + "px";
  }, 10);

  fadeOut(element, 1000, 0, function () {
    element.remove();
  });
}

setInterval(function () {
  for (let i = 0; i < achievement.name.length; i++) {
    if (achievement.type == "alpha" && game.totalAlpha >= achievement.requirement[i]) {achievement.earn(i);} 
    else if (achievement.type == "click" && game.totalClicks >= achievement.requirement[i]) {achievement.earn(i);}
    else if (achievement.type == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) {achievement.earn(i);}
  }
  game.alpha += game.getAlphaPerSecond();
  game.totalAlpha += game.getAlphaPerSecond();
  display.updateAlpha();
  display.updateAchievements();
}, 1000);

setInterval(function () {
  display.updateAlpha();
  display.updateUpgrades();
}, 10000);

setInterval(function () {
  saveGame();
}, 3000);

document.addEventListener(
  "keydown",
  function (event) {
    if (event.ctrlKey && event.which == 83) {
      event.preventDefault();
      saveGame();
    }
  },
  false
);

let main = document.querySelector("#tab1");
let store = document.querySelector("#tab2");
let upgrades = document.querySelector("#tab3");
let achievements = document.querySelector("#tab4");
//stonks oi
let scoretop = document.querySelector("#scoretop");
let upgradescontainer = document.querySelector(".store-2");
let achievementscontainer = document.querySelector("#achievementContainer");
let clickerstore = document.querySelector(".store");
main.addEventListener("click", function(event) {
  scoretop.style.display = "block";
  clickerstore.style.display = "none";
  upgradescontainer.style.display = "none";
  achievementscontainer.style.display = "none";
});
store.addEventListener("click", function(event) {
  scoretop.style.display = "none";
  clickerstore.style.display = "block";
  upgradescontainer.style.display = "none";
  achievementscontainer.style.display = "none";
});
upgrades.addEventListener("click", function(event) {
  scoretop.style.display = "none";
  clickerstore.style.display = "none";
  upgradescontainer.style.display = "block";
  achievementscontainer.style.display = "none";
});
achievements.addEventListener("click", function(event) {
  scoretop.style.display = "none";
  clickerstore.style.display = "none";
  upgradescontainer.style.display = "none";
  achievementscontainer.style.display = "block";
});