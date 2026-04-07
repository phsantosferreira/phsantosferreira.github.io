// ===============================
// CONFIGURAÇÃO DOS EVENTOS
// ===============================
window.eventsConfig = [
  {
    name: "Devil Square",
    type: "pve",
    times: [
      "00:30",
      "02:30",
      "04:30",
      "06:30",
      "08:30",
      "10:30",
      "12:30",
      "14:30",
      "16:30",
      "18:30",
      "20:30",
      "22:30"
    ],
	entryTime: 5,
    duration: 15,
    days: [1, 2, 3, 4, 5, 6]
  },
  {
    name: "Blood Castle",
    type: "pve",
    times: [
      "01:00",
      "03:00",
      "05:00",
      "07:00",
      "09:00",
      "11:00",
      "13:00",
      "15:00",
      "17:00",
      "19:00",
      "21:00",
      "23:00"
    ],
	entryTime: 5,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Chaos Castle",
    type: "pvpve",
    times: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
	entryTime: 5,
    duration: 10,
    days: [0, 1, 2, 3, 4, 5, 6]
  },

  {
    name: "Golden Dragon",
    type: "invasão",
    times: ["07:30", "15:30", "23:30"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "White Wizard",
    type: "invasão",
    times: ["02:00", "10:00", "18:00"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Red Dragon (Lorencia)",
    type: "invasão",
    times: ["03:30", "17:30"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Red Dragon (Noria)",
    type: "invasão",
    times: ["09:30"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Red Dragon (Devias)",
    type: "invasão",
    times: ["21:30"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Skeleton King (Lorencia)",
    type: "invasão",
    times: ["16:00", "22:00"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Skeleton King (Noria)",
    type: "invasão",
    times: ["01:30", "05:30", "11:30"],
	entryTime: 0,
    duration: 15,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Red Dragon",
    type: "boss",
    times: ["01:00", "09:00", "17:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Erohim",
    type: "boss",
    times: ["19:40"],
	entryTime: 0,
    duration: 30,
	days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Mega Boss (Crywolf)",
    type: "boss",
    times: ["19:45"],
	entryTime: 0,
    duration: 30,
    days: [6]
  },
  {
    name: "Death Beam Knight",
    type: "boss",
    times: ["00:00", "08:00", "16:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Genocider",
    type: "boss",
    times: ["02:00", "10:00", "18:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Hell Maine",
    type: "boss",
    times: ["03:00", "11:00", "19:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Hydra",
    type: "boss",
    times: ["07:00", "15:00", "23:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Illusion of Kundun",
    type: "boss",
    times: ["06:00", "14:00", "22:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Phoenix of Darkness",
    type: "boss",
    times: ["05:00", "13:00", "21:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    name: "Rei Kundun",
    type: "boss",
    times: ["04:00", "12:00", "20:00"],
	entryTime: 0,
    duration: 30,
    days: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    // checkar horario
    name: "Bônus de XP +50%",
    type: "bônus",
    times: ["00:00"],
	entryTime: 0,
    duration: 2880,
    days: [6, 0]
  },
  {
    name: "Rei do PvP",
    type: "special",
    times: ["20:00"],
	entryTime: 0,
    duration: 30,
    days: [1, 2, 3, 4, 5]
  },
  {
    name: "Castle Siege",
    type: "special",
    times: ["18:00"],
	entryTime: 0,
    duration: 60,
    days: [0]
  }
];