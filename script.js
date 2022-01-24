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
  }, 20);
  packetsCount += packetsPerClick;
  updatePackets(packetsCount);

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
  if (packetsCount >= pcCost) {
    let device = document.querySelector("#pc");
    device.className = "device available";

    device.onclick = () => {
      if (pcCost <= packetsCount) {
        packetsCount -= pcCost;
        updatePackets(packetsCount);
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
        updatePackets(packetsCount);
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
        updatePackets(packetsCount);
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
        updatePackets(packetsCount);
        switchCount++;
        l3switchCost *= 1.3;
        l3switchCost = l3switchCost.toFixed(0);
        document.querySelector("#switch-price").innerHTML =
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
    packetsCount += switchCount + routerCount * 10 + l3switchCount * 100;
    packetsPerSecond = switchCount + routerCount * 10 + l3switchCount * 100;
    document.querySelector(".packetsPerSecond").innerHTML =
      packetsPerSecond + "/s";
    updatePackets(packetsCount);
    packetsPerSecondLoop();
  }, 1000);
}

packetsPerSecondLoop();
