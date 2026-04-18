const map = document.getElementById("map");
const container = document.getElementById("map-container");
const coordsText = document.getElementById("coords");

const inputX = document.getElementById("inputX");
const inputY = document.getElementById("inputY");
const addBtn = document.getElementById("addBtn");
const mapSelect = document.getElementById("mapSelect");

let marker = null;
let mobsVisible = true;
let npcsVisible = true;
let entities = [];

// ===============================
// MAPAS
// ===============================
const maps = {
  "lorencia": {
		"src": "./img/maps/Lorencia.webp", 
		"offsetX": 3, 
		"offsetY": 3,
		"mobs": [
			{ 
				"name": "Budge Dragon", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 186, "x": 126 },
				]
			},
			{ 
				"name": "Spider", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 182, "x": 129 },
				]
			},
			{ 
				"name": "Giant", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 19, "x": 22 },
					{ "y": 25, "x": 49 },
				]
			},
			{ 
				"name": "Elite Bull Fighter", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 35, "x": 102 },
					{ "y": 80, "x": 201 },
				]
			},
			{ 
				"name": "Hound", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 88, "x": 122 },
				]
			},
			{ 
				"name": "Lich", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 125, "x": 181 },
				]
			},
			{ 
				"name": "Skeleton", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 124, "x": 223 },
					{ "y": 135, "x": 221 },
					{ "y": 142, "x": 221 },
				]
			},
		],
		"npcs": [],
		"msc": [
			{ 
				"name": "Entrada de Noria", 
				"img": "./img/msc/portal.webp", 
				"positions": [
					{ "y": 215, "x": 245 },
				]
			},
			{ 
				"name": "Entrada de Dungeon", 
				"img": "./img/msc/portal.webp", 
				"positions": [
					{ "y": 122, "x": 231 },
				]
			},
			{ 
				"name": "Entrada de Valley of Loren", 
				"img": "./img/msc/portal.webp", 
				"positions": [
					{ "y": 235, "x": 13 },
				]
			},
		],
	},
  "noria": {
		"src": "./img/maps/Noria.webp", 
		"offsetX": 3, 
		"offsetY": 3,
		"mobs": [
			{ 
				"name": "Goblin", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 145, "x": 110 },
				]
			},
			{ 
				"name": "Elite Goblin", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 156, "x": 59 },
				]
			},
			{ 
				"name": "Beetle Monster", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 145, "x": 76 },
				]
			},
			{ 
				"name": "Forest Monster", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 226, "x": 143 },
				]
			},
			{ 
				"name": "Agon", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 233, "x": 159 },
				]
			},
			{ 
				"name": "Stone Golem", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 213, "x": 190 },
				]
			},
			{ 
				"name": "Chain Scorpion", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 144, "x": 115 },
				]
			},
			{ 
				"name": "Hunter", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 184, "x": 160 },
				]
			},
		],
		"npcs": [],
		"msc": [
			{ 
				"name": "Entrada de Aida", 
				"img": "./img/msc/portal.webp", 
				"positions": [
					{ "y": 222, "x": 28 },
				]
			},
		],
	},
  "devias": {
		"src": "./img/maps/Devias.webp", 
		"offsetX": 3, 
		"offsetY": 3,
		"mobs": [
			{  
				"name": "Worm", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 232, "x": 84 },
				]
			},
			{ 
				"name": "Hommerd", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 214, "x": 115 },
				]
			},
			{ 
				"name": "Elite Yeti", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 139, "x": 147 },
					{ "y": 219, "x": 214 },
					{ "y": 234, "x": 214 },
					{ "y": 196, "x": 146 },
				]
			},
			{ 
				"name": "Ice Queen", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 35, "x": 188 },
					{ "y": 28, "x": 223 },
				]
			},
			{ 
				"name": "Ice Monster", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 223, "x": 215 },
				]
			},
		],
		"npcs": [],
		"msc": [],
	},
  "dungeon": {
		"src": "./img/maps/Dungeon.webp", 
		"offsetX": 3, 
		"offsetY": 3,
		"mobs": [
			{ 
				"name": "Larva", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 98, "x": 215 },
				]
			},
			{ 
				"name": "Cyclops", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 4, "x": 236 },
					{ "y": 236, "x": 171 },
				]
			},
			{ 
				"name": "Ghost", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 243, "x": 170 },
				]
			},
			{ 
				"name": "Skeleton Archer", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 170, "x": 119 },
					{ "y": 69, "x": 120 },
				]
			},
			{ 
				"name": "Hell Spider", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 86, "x": 116 },
				]
			},
			{ 
				"name": "Chief Skeleton Warrior", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 68, "x": 118 },
				]
			},
			{ 
				"name": "Dark Knight", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 8, "x": 124 },
				]
			},
			{ 
				"name": "Gorgon", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 39, "x": 118 },
				]
			},
			{ 
				"name": "Poison Bull Fighter", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 43, "x": 56 },
				]
			},
			{ 
				"name": "Thunder Lich", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 9, "x": 56 },
				]
			},
		],
		"npcs": [],
		"msc": [
			{ 
				"name": "Entrada de Stadium", 
				"img": "./img/msc/portal.svg", 
				"positions": [
					{ "y": 6, "x": 32 },
				]
			},
		],
	},
  "atlans": {
		"src": "./img/maps/Atlans.webp", 
		"offsetX": 3, 
		"offsetY": 3,
		"mobs": [
			{ 
				"name": "Bahamut", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 19, "x": 38 },
					{ "y": 37, "x": 47 },
					{ "y": 44, "x": 68 },
					{ "y": 75, "x": 43 },
					{ "y": 67, "x": 15 },
				]
			},
			{ 
				"name": "Valkyrie", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 24, "x": 41 },
					{ "y": 65, "x": 43 },
					{ "y": 61, "x": 13 },
				]
			},
			{ 
				"name": "Vepar", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 23, "x": 45 },
					{ "y": 41, "x": 51 },
					{ "y": 44, "x": 62 },
					{ "y": 73, "x": 48 },
					{ "y": 69, "x": 22 },
				]
			},
			{ 
				"name": "Great Bahamut", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 226, "x": 59 },
					{ "y": 229, "x": 72 },
					{ "y": 214, "x": 59 },
					{ "y": 223, "x": 83 },
					{ "y": 219, "x": 84 },
					{ "y": 56, "x": 182 },
				]
			},
			{ 
				"name": "Sea Worm", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 22, "x": 164 },
					{ "y": 114, "x": 175 },
				]
			},
			{ 
				"name": "Silver Valkyrie",
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 74, "x": 180 },
				]
			},
			{ 
				"name": "Lizard King", 
				"img": "./img/mobs/msc/monster.svg", 
				"positions": [
					{ "y": 30, "x": 227 },
				]
			},
		],
		"npcs": [],
		"msc": [],
	},
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
  
  setTimeout(renderEntities, 100);
});

function redirect(url) {
	window.location.href = url;
}

function renderEntities() {
  entities.forEach(e => e.remove());
  entities = [];

  const mapData = getCurrentMap();
  if (!mapData) return;

  const mapRect = map.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // MOBS
  if (mobsVisible && mapData.mobs) {
    mapData.mobs.forEach(mob => {
      mob.positions.forEach(posGame => {

        const pos = gameToScreen(posGame.x, posGame.y);

        const el = document.createElement("div");
        el.className = "pin monster";
        el.style.backgroundImage = `url(${mob.img})`;
        el.title = mob.name;

        const y = pos.y + (mapRect.top - containerRect.top);

        el.style.left = pos.x + "px";
        el.style.top = y + "px";

        container.appendChild(el);
        entities.push(el);
      });
    });
  }

  // NPCS
  if (npcsVisible && mapData.npcs) {
    mapData.npcs.forEach(npc => {
      npc.positions.forEach(posGame => {

        const pos = gameToScreen(posGame.x, posGame.y);

        const el = document.createElement("div");
        el.className = "pin npc";
        el.style.backgroundImage = `url(${npc.img})`;
        el.title = npc.name;

        const y = pos.y + (mapRect.top - containerRect.top);

        el.style.left = pos.x + "px";
        el.style.top = y + "px";

        container.appendChild(el);
        entities.push(el);
      });
    });
  }
}

document.getElementById("toggleMobs").addEventListener("change", function () {
  mobsVisible = this.checked;
  renderEntities();
});

document.getElementById("toggleNpcs").addEventListener("change", function () {
  npcsVisible = this.checked;
  renderEntities();
});

// init
map.src = getCurrentMap().src;
setTimeout(renderEntities, 200);

