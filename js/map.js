const map = document.getElementById("map");
const container = document.getElementById("map-container");
const coordsText = document.getElementById("coords");

const inputX = document.getElementById("inputX");
const inputY = document.getElementById("inputY");
const addBtn = document.getElementById("addBtn");
const mapSelect = document.getElementById("mapSelect");

let marker = null;

// ===============================
// MAPAS
// ===============================
const maps = {
  lorencia: { src: "./img/maps/Lorencia.webp", offsetX: 3, offsetY: 3 },
  noria: { src: "./img/maps/Noria.webp", offsetX: 0, offsetY: 0 },
  devias: { src: "./img/maps/Devias.webp", offsetX: 0, offsetY: 0 },
  dungeon: { src: "./img/maps/Dungeon.webp", offsetX: 0, offsetY: 0 },
  atlans: { src: "./img/maps/Atlans.webp", offsetX: 3, offsetY: 3 },
  losttower: { src: "./img/maps/Lost_Tower.webp", offsetX: 0, offsetY: 0 },
  tarkan: { src: "./img/maps/Tarkan.webp", offsetX: 3, offsetY: 3 },
  icarus: { src: "./img/maps/Icarus.webp", offsetX: 0, offsetY: 0 },
  ruins: { src: "./img/maps/Kanturu_Ruins.webp", offsetX: 0, offsetY: 0 },
  relics: { src: "./img/maps/Kanturu_Relics.webp", offsetX: 0, offsetY: 0 },
  land: { src: "./img/maps/Land_of_Trials.webp", offsetX: 0, offsetY: 0 },
  aida: { src: "./img/maps/Aida.webp", offsetX: 0, offsetY: 0 },
  crywolf: { src: "./img/maps/Crywolf.webp", offsetX: 0, offsetY: 0 },
  balgass: { src: "./img/maps/Barracks_of_Balgass.webp", offsetX: 0, offsetY: 0 },
};

function getCurrentMap() {
  return maps[mapSelect.value];
}

// ===============================
// CONVERSÃO
// ===============================
function gameToScreen(x, y) {
  const rect = map.getBoundingClientRect();
  const cfg = getCurrentMap();

  return {
	y: ((y + cfg.offsetY) / 256) * rect.height,
    x: ((x + cfg.offsetX) / 256) * rect.width
  };
}

function screenToGame(x, y) {
  const rect = map.getBoundingClientRect();
  const cfg = getCurrentMap();

  return {
	y: Math.floor((y / rect.height) * 256) - cfg.offsetY,
    x: Math.floor((x / rect.width) * 256) - cfg.offsetX
  };
}

function setMarker(x, y) {
  if (marker) marker.remove();

  marker = document.createElement("div");
  marker.className = "marker";
  marker.style.left = x + "px";
  marker.style.top = y + "px";

  container.appendChild(marker);
}

// ===============================
// EVENTOS (🔥 CORREÇÃO AQUI)
// ===============================
container.addEventListener("click", (e) => {
  if (e.target !== map) return; // evita clique na barra

  const containerRect = container.getBoundingClientRect();
  const mapRect = map.getBoundingClientRect();

  // posição real dentro da imagem
  const clickX = e.clientX - mapRect.left;
  const clickY = e.clientY - mapRect.top;

  const game = screenToGame(clickX, clickY);

  coordsText.innerText = `Y: ${game.y}, X: ${game.x}`;
  inputX.value = game.x;
  inputY.value = game.y;

  // posiciona marcador relativo ao container
  const markerX = clickX;
  const markerY = clickY + (mapRect.top - containerRect.top);

  setMarker(markerX, markerY);
});

addBtn.addEventListener("click", () => {
  const x = parseInt(inputX.value);
  const y = parseInt(inputY.value);

  if (isNaN(x) || isNaN(y)) return;

  const pos = gameToScreen(x, y);

  coordsText.innerText = `Y: ${y}, X: ${x}`;

  const mapRect = map.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const markerY = pos.y + (mapRect.top - containerRect.top);

  setMarker(pos.x, markerY);
});

mapSelect.addEventListener("change", () => {
  const cfg = getCurrentMap();
  map.src = cfg.src;

  if (marker) {
    marker.remove();
    marker = null;
  }

  coordsText.innerText = "Y: -, X: -";
  inputX.value = "";
  inputY.value = "";
});

function redirect(url) {
	window.location.href = url;
}

// ===============================
// ZOOM MOBILE (PINCH)
// ===============================
let scale = 1;
let lastDistance = null;

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

map.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const distance = getDistance(e.touches);

    if (lastDistance) {
      let delta = distance - lastDistance;

      scale += delta * 0.005;
      scale = Math.min(Math.max(1, scale), 3);

      map.style.transform = `scale(${scale})`;
    }

    lastDistance = distance;
  }
});

map.addEventListener("touchend", () => {
  lastDistance = null;
});

// init
map.src = getCurrentMap().src;

