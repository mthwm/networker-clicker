let packetsCount = 0;
packetsPerClick = 1;
let pcCost = 10;
let pcCount = 1;
let switchCost = 100;
let switchCount = 0;
let packetsPerSecond = 0;
let routerCost = 500;
let routerCount = 0;
let l3switchCost = 1500;
let l3switchCount = 0;
let packetsCountPlaceholder = 0.0;
let packetsCountFormatted = "";

window.onload = function () {
  document.body.onselectstart = function () {
    return false;
  };
};

// TODO - upgrades

function updatePackets(amount) {
  let packetsDisplay = document.querySelector(".packets");

  packetsDisplay.innerHTML = amount + " packets";
}
window.requestAnimationFrame(gameLoop);

function addPackets() {
  setTimeout(() => {
    document
      .querySelector(".left")
      .removeChild(document.querySelector(".tooltip"));
  }, 50);
  packetsCount += packetsPerClick;
  updatePackets(packetsCountFormatted);

  const parent = document.querySelector(".left");
  const tooltip = document.createElement("div");

  tooltip.className = "tooltip";
  tooltip.innerHTML = `+ ${packetsPerClick}`;

  let left = 25;
  let top = 300;

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";
  parent.appendChild(tooltip);
}

function gameLoop() {
  if (packetsCount < 1000) {
    packetsCountFormatted = packetsCount;
  }

  if (packetsCount >= 1000) {
    packetsCountPlaceholder = packetsCount / 1000;
    packetsCountFormatted = packetsCountPlaceholder.toFixed(1) + "k";
  }

  if (packetsCount >= 1000000) {
    packetsCountPlaceholder = packetsCount / 1000000;
    packetsCountFormatted = packetsCountPlaceholder.toFixed(1) + "m";
  }

  if (packetsCount >= 1000000000) {
    packetsCountPlaceholder = packetsCount / 1000000000;
    packetsCountFormatted = packetsCountPlaceholder.toFixed(1) + "b";
  }

  if (packetsCount >= 1000000000000) {
    packetsCountPlaceholder = packetsCount / 1000000000000;
    packetsCountFormatted = packetsCountPlaceholder.toFixed(1) + "t";
  }

  if (packetsCount >= pcCost) {
    let device = document.querySelector("#pc");
    device.className = "device available";

    device.onclick = () => {
      if (pcCost <= packetsCount) {
        packetsCount -= pcCost;
        updatePackets(packetsCountFormatted);
        packetsPerClick = pcCount + 1;
        pcCount++;
        pcCost *= 1.3;
        pcCost = pcCost.toFixed(0);
        document.querySelector("#pc-price").innerHTML = pcCost + " packets";
      }
    };
  }

  if (packetsCount >= switchCost) {
    let device = document.querySelector("#switch");
    device.className = "device available";

    device.onclick = () => {
      if (switchCost <= packetsCount) {
        packetsCount -= switchCost;
        updatePackets(packetsCountFormatted);
        switchCount++;
        switchCost *= 1.3;
        switchCost = switchCost.toFixed(0);
        document.querySelector("#switch-price").innerHTML =
          switchCost + " packets";
      }
    };
  }

  if (packetsCount >= routerCost) {
    let device = document.querySelector("#router");
    device.className = "device available";

    device.onclick = () => {
      if (routerCost <= packetsCount) {
        packetsCount -= routerCost;
        updatePackets(packetsCountFormatted);
        routerCount++;
        routerCost *= 1.3;
        routerCost = routerCost.toFixed(0);
        document.querySelector("#router-price").innerHTML =
          routerCost + " packets";
      }
    };
  }

  if (packetsCount >= l3switchCost) {
    let device = document.querySelector("#l3switch");
    device.className = "device available";

    device.onclick = () => {
      if (l3switchCost <= packetsCount) {
        packetsCount -= l3switchCost;
        updatePackets(packetsCountFormatted);
        l3switchCount++;
        l3switchCost *= 1.3;
        l3switchCost = l3switchCost.toFixed(0);
        document.querySelector("#l3switch-price").innerHTML =
          l3switchCost + " packets";
      }
    };
  }

  if (packetsCount < pcCost) {
    let device = document.querySelector("#pc");
    device.className = "device unavailable";
  }
  if (packetsCount < switchCost) {
    let device = document.querySelector("#switch");
    device.className = "device unavailable";
  }
  if (packetsCount < routerCost) {
    let device = document.querySelector("#router");
    device.className = "device unavailable";
  }
  if (packetsCount < l3switchCost) {
    let device = document.querySelector("#l3switch");
    device.className = "device unavailable";
  }

  window.requestAnimationFrame(gameLoop);
}

function packetsPerSecondLoop() {
  setTimeout(() => {
    let l3switchPerSecond = l3switchCount * 100;
    let routerPerSecond = routerCount * 10;
    packetsCount += switchCount + routerPerSecond;
    packetsCount += l3switchPerSecond;
    packetsPerSecond = switchCount + routerPerSecond;
    packetsPerSecond += l3switchPerSecond;
    document.querySelector(".packetsPerSecond").innerHTML =
      packetsPerSecond + "/s";
    fetch("https://api.countapi.xyz/update/Super_Stranka/ZULUL/?amount=1");
    updatePackets(packetsCountFormatted);
    packetsPerSecondLoop();
  }, 1000);
}

packetsPerSecondLoop();
