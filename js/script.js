// ===============================
// IMPORTAÇÃO DOS EVENTOS
// ===============================
const eventsConfig = window.eventsConfig || [];

// ===============================
// ESTADO GLOBAL
// ===============================
let showStatic = false;

// ===============================
// ELEMENTOS DOM
// ===============================
const toggleBtn = document.getElementById("toggleMode");

const tableCountdown = document.getElementById("tableCountdown");
const tableStatic = document.getElementById("tableStatic");

const tbodyCountdown = document.getElementById("eventsCountdown");
const tbodyStatic = document.getElementById("eventsStatic");

// ===============================
// CONSTANTES
// ===============================
const DAY_NAMES = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

// ===============================
// EVENTO DO BOTÃO
// ===============================
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    showStatic = !showStatic;

    // alterna tabelas
    tableCountdown.classList.toggle("hidden", showStatic);
    tableStatic.classList.toggle("hidden", !showStatic);

    toggleBtn.textContent = !showStatic
      ? "Modo Schedule"
      : "Modo Countdown";

    render();
  });
}

// ===============================
// HELPERS
// ===============================

// fallback para todos os dias
function getDays(days) {
  return days ?? [0,1,2,3,4,5,6];
}

// formata dias da semana
function formatDays(days) {
  const validDays = getDays(days);

  if (validDays.length === 7) return "Todos";

  return validDays.map(d => DAY_NAMES[d]).join(", ");
}

// formata countdown (horas acumuladas)
function formatCountdown(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0")
  ].join(":");
}

// ===============================
// CÁLCULO DO EVENTO
// ===============================
function calculateEventState(event) {
  const now = new Date();
  const nowTime = now.getTime();

  const days = getDays(event.days);

  let opened = false;
  let current = false;
  let next = Infinity;

  event.times.forEach(time => {
    const [h, m] = time.split(":");

    for (let i = 0; i < 7; i++) {
      const future = new Date(now);
      future.setDate(now.getDate() + i);
      future.setHours(h, m, 0, 0);

      if (!days.includes(future.getDay())) continue;

      const start = future.getTime();
      const end = start + event.duration * 60000;
	  
	  // evento aberto
	  if (event.entryTime > 0 && now >= start && now < start + (event.entryTime * 60 * 1000 )) {
		opened = true;
	  }

      // evento em andamento
      if (nowTime >= start && nowTime <= end) {
        current = true;
      }

      // próximo evento
      if (start > nowTime && start < next) {
        next = start;
      }
    }
  });

  return {
    current,
	opened,
    next: new Date(next)
  };
}

// ===============================
// RENDER
// ===============================
function render() {
  if (!tbodyCountdown || !tbodyStatic) return;

  tbodyCountdown.innerHTML = "";
  tbodyStatic.innerHTML = "";

  const now = Date.now();

  let closestName = "";
  let closestDiff = Infinity;

  // calcula eventos
  const computed = eventsConfig.map(event => {
    const { current, opened, next } = calculateEventState(event);
    const diff = next - now;

    if (!current && diff < closestDiff) {
      closestDiff = diff;
      closestName = event.name;
    }

    return { ...event, current, opened, diff };
  });

  // ===========================
  // RENDER COUNTDOWN
  // ===========================
  computed.forEach(ev => {
    const tr = document.createElement("tr");

    if (ev.name === closestName) {
      tr.classList.add("next");
    }

	const isUrgent = ev.diff <= 5 * 60 * 1000;
    const status = ev.opened
      ? `<span class="opened">Aberto</span>` 
      : ev.current
			? `<span class="started">Iniciado</span>`
			: `<span class="${isUrgent ? "countdown urgent" : "countdown"}">${formatCountdown(Math.max(0, ev.diff))}</span>`;

    tr.innerHTML = `
      <td>${ev.name}</td>
      <td class="type ${ev.type}">${ev.type}</td>
      <td>${status}</td>
    `;

    tbodyCountdown.appendChild(tr);
  });

  // ===========================
  // RENDER HORÁRIOS
  // ===========================
  computed.forEach(ev => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${ev.name}</td>
      <td class="days">${formatDays(ev.days)}</td>
      <td class="countdown">${ev.times.join(" | ")}</td>
    `;

    tbodyStatic.appendChild(tr);
  });
}

// ===============================
// LOOP
// ===============================
setInterval(render, 1000);
render();