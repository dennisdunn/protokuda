// The demo console's moving parts. None of this is needed to use Protokuda;
// the theme and alert handlers live in index.html.

const calm = matchMedia("(prefers-reduced-motion: reduce)");
const $ = (id) => document.getElementById(id);
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const rand = (min, max) => min + Math.random() * (max - min);

/** Clock: a made-up stardate, 1000 units per year, ticking in real time. */
function stardate(now = new Date()) {
  const start = Date.UTC(now.getUTCFullYear(), 0, 1);
  const end = Date.UTC(now.getUTCFullYear() + 1, 0, 1);
  return ((now.getUTCFullYear() - 1946) * 1000 + ((now - start) / (end - start)) * 1000).toFixed(1);
}

function tick() {
  const sd = stardate();
  $("stardate").textContent = sd;
  $("statusline").textContent = `Stardate ${sd}`;
}

/** Header condition, driven by the global alert checkbox. */
function setCondition(red) {
  $("condition").textContent = red ? "Red" : $("scope").dataset.shields === "up" ? "Yellow" : "Green";
  log(red ? "Red alert: all hands" : "Alert cancelled");
}

function setShields(state) {
  $("scope").dataset.shields = state;
  if (!$("globalalert").checked) setCondition(false);
  log(`Shields ${state}`);
}

function setWarp(value) {
  $("warpout").value = Number(value).toFixed(1);
}

/** Sensors: a rotating sweep; each contact flares as the sweep passes over it. */
const SWEEP_MS = 4000;

function setScan(range) {
  const scope = $("scope");
  scope.dataset.range = range;
  scope.querySelectorAll(".blip").forEach((b) => b.remove());

  const count = range === "long" ? Math.round(rand(5, 9)) : Math.round(rand(1, 3));
  const sweepTime = scope.querySelector(".sweep").getAnimations()[0]?.currentTime ?? 0;
  let hostiles = 0;

  for (let i = 0; i < count; i++) {
    const bearing = rand(0, 360);
    const distance = rand(range === "long" ? 0.15 : 0.3, 0.92) / 2;
    const rad = (bearing * Math.PI) / 180;
    const blip = document.createElement("span");
    blip.className = "blip";
    if (Math.random() < 0.15) {
      blip.classList.add("hostile");
      hostiles++;
    }
    blip.style.left = `${50 + Math.sin(rad) * distance * 100}%`;
    blip.style.top = `${50 - Math.cos(rad) * distance * 100}%`;
    // Phase the flare so it lines up with the sweep's leading edge.
    const phase = (((sweepTime - (bearing / 360) * SWEEP_MS) % SWEEP_MS) + SWEEP_MS) % SWEEP_MS;
    blip.style.animationDelay = `${-phase}ms`;
    scope.append(blip);
  }

  const contacts = `${count} contact${count === 1 ? "" : "s"}`;
  $("scanlabel").textContent = `${range} range: ${contacts}${hostiles ? `, ${hostiles} unknown` : ""}`;
  log(`${range} range scan: ${contacts}`);
}

/** Telemetry: an Okuda data cascade that fills its frame and churns. */
function cell() {
  const span = document.createElement("span");
  scramble(span);
  return span;
}

function scramble(span) {
  const digits = pick([2, 3, 4, 4, 5, 6]);
  span.textContent = String(Math.floor(Math.random() * 10 ** digits)).padStart(digits, "0");
  span.className = pick(["", "", "", "hot", "cool", "dim"]);
}

function fillCascade() {
  const grid = $("cascade");
  const style = getComputedStyle(grid);
  const cols = style.gridTemplateColumns.split(" ").length;
  const rows = Math.max(1, Math.floor(grid.clientHeight / parseFloat(style.gridAutoRows)));
  const want = cols * rows;
  while (grid.children.length < want) grid.append(cell());
  while (grid.children.length > want) grid.lastChild.remove();
}

function churnCascade() {
  const cells = $("cascade").children;
  for (let i = 0; i < 3 && cells.length; i++) scramble(pick(cells));
}

/** Ship systems: two groups of gauges that drift around their nominal level. */
const SYSTEMS = {
  power: [["Warp core", 92], ["Impulse", 74], ["EPS grid", 81], ["Batteries", 66]],
  defense: [["Shields", 100], ["Phasers", 88], ["Torpedoes", 40], ["Hull", 97]],
};

function showSystems(group) {
  const gauges = $("gauges");
  gauges.replaceChildren();
  for (const [name, level] of SYSTEMS[group]) {
    const label = document.createElement("span");
    label.textContent = name;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.innerHTML = '<div class="fill"></div>';
    bar.dataset.nominal = level;
    const value = document.createElement("span");
    value.className = "value";
    gauges.append(label, bar, value);
    setLevel(bar, level);
  }
  log(`${group} report`);
}

function setLevel(bar, level) {
  bar.firstChild.style.setProperty("--level", level);
  bar.nextSibling.textContent = Math.round(level);
}

function driftGauges() {
  for (const bar of $("gauges").querySelectorAll(".bar")) {
    const nominal = Number(bar.dataset.nominal);
    setLevel(bar, Math.min(100, Math.max(5, nominal + rand(-8, 6))));
  }
}

/** The frame label doubles as a short ship's log, newest at the bottom. */
function log(text) {
  const now = new Date();
  const line = document.createElement("span");
  line.textContent = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")} ${text}`;
  const el = $("log");
  el.append(line);
  while (el.children.length > 4) el.firstChild.remove();
}

const CHATTER = [
  "Sensor sweep nominal",
  "Subspace relay ack",
  "Deflector realigned",
  "Plasma flow stable",
  "Course correction",
  "Hail on channel 3",
  "Diagnostic level 4",
  "Dilithium matrix ok",
];

// Animations can be switched on and off with the viewer's motion preference.
let timers = [];

function startMotion() {
  timers.forEach(clearInterval);
  timers = [setInterval(tick, 1000)];
  if (calm.matches) return;
  timers.push(
    setInterval(churnCascade, 140),
    setInterval(driftGauges, 2400),
    setInterval(() => log(pick(CHATTER)), 7000),
  );
}

tick();
setWarp($("warp").value);
log("Systems online");
showSystems("power");
setScan("long");
fillCascade();
new ResizeObserver(fillCascade).observe($("cascade"));
startMotion();
calm.addEventListener("change", startMotion);
