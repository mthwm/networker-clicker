let packetsCount = 0;
packetsPerClick = 1;
let pcCost = 10;
let pcCount = 1;
let switchCost = 100;
let switchCount = 0;

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
  }, 200);
  packetsCount += packetsPerClick;
  updatePackets(packetsCount);

  const parent = document.querySelector(".left");
  const tooltip = document.createElement("div");

  tooltip.className = "tooltip";
  tooltip.innerHTML = `+ ${packetsPerClick}`;

  var left = 25;
  var top = 300;

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
        pcCost *= 1.5;
        pcCost = pcCost.toFixed(0);
        document.querySelector(".price").innerHTML = pcCost + " packets";
      }
    };
  } else {
    let device = document.querySelector("#pc");
    device.className = "device unavailable";
  }

  window.requestAnimationFrame(gameLoop);
}
