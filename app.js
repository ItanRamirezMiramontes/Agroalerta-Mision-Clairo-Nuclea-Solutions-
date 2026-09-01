const state = {
  mode: "producer",
  section: "overview",
  currentField: "north",
  currentCrop: "berries",
  fieldMetric: "moisture",
  overviewMetric: "moisture",
  govMapMode: "product",
  region: "cienega",
  horizon: 72,
  moistureHistory: [28.6, 29.1, 29.8, 31.2, 32.5, 32.2, 31.8],
  decisions: [
    {
      date: "Hoy · 09:10",
      title: "Riego reducido 8%",
      note: "Parcela Norte · decisión del operador",
    },
    {
      date: "Ayer · 17:40",
      title: "Revisión de gotero",
      note: "Zona B · anomalía de humedad",
    },
    {
      date: "29 Ago · 11:20",
      title: "Fertilización registrada",
      note: "Parcela Centro · operación manual",
    },
  ],
};

const crops = {
  berries: {
    name: "Frambuesa",
    color: "#7d4258",
    targetMoisture: 29,
    baseYield: 14.9,
    ec: 1.7,
    ndvi: 0.76,
    et: 3.7,
  },
  avocado: {
    name: "Aguacate",
    color: "#5a7a49",
    targetMoisture: 27,
    baseYield: 12.4,
    ec: 1.5,
    ndvi: 0.72,
    et: 4.2,
  },
  agave: {
    name: "Agave",
    color: "#5c7b79",
    targetMoisture: 21,
    baseYield: 95.0,
    ec: 1.3,
    ndvi: 0.61,
    et: 2.9,
  },
  maize: {
    name: "Maíz",
    color: "#9d8740",
    targetMoisture: 25,
    baseYield: 10.6,
    ec: 1.6,
    ndvi: 0.69,
    et: 4.5,
  },
};

const fields = {
  north: { name: "Norte", area: 6.2, moisture: 31.8, temp: 21.4, risk: "Bajo" },
  center: {
    name: "Centro",
    area: 5.8,
    moisture: 27.6,
    temp: 22.1,
    risk: "Medio",
  },
  south: { name: "Sur", area: 6.4, moisture: 30.9, temp: 20.8, risk: "Bajo" },
};

const parcelAnalytics = {
  north: {
    soilType: "Franco-arenoso",
    hectares: 6.2,
    irrigation: { applied: 18.4, demand: 20.1, efficiency: 82 },
    history: [
      27.8, 28.4, 29.1, 30.3, 31.2, 32.5, 31.8, 30.9, 31.4, 31.8, 32.1, 31.8,
    ],
    ndvi: [0.68, 0.71, 0.73, 0.75, 0.76, 0.78, 0.76],
    yield: [13.1, 13.5, 13.9, 14.2, 14.5, 14.7, 14.9],
    anomalies: 2,
    lastInspection: "hace 2 días",
  },
  center: {
    soilType: "Franco-arcilloso",
    hectares: 5.8,
    irrigation: { applied: 22.7, demand: 20.8, efficiency: 69 },
    history: [
      30.4, 29.7, 28.9, 28.2, 27.6, 27.1, 26.8, 27.4, 27.6, 27.2, 26.9, 27.6,
    ],
    ndvi: [0.67, 0.66, 0.68, 0.69, 0.68, 0.7, 0.69],
    yield: [12.8, 12.7, 12.6, 12.8, 12.9, 13.0, 13.1],
    anomalies: 5,
    lastInspection: "hace 6 días",
  },
  south: {
    soilType: "Franco",
    hectares: 6.4,
    irrigation: { applied: 16.9, demand: 18.2, efficiency: 77 },
    history: [
      26.3, 27.1, 28.5, 29.2, 30.1, 30.9, 30.5, 30.2, 30.7, 31.1, 30.8, 30.9,
    ],
    ndvi: [0.64, 0.67, 0.68, 0.7, 0.72, 0.71, 0.72],
    yield: [12.4, 12.8, 13.0, 13.2, 13.5, 13.7, 13.8],
    anomalies: 3,
    lastInspection: "hace 3 días",
  },
};

const sensors = [
  ["SM-01", "Norte", "Humedad suelo", "31.8%", "99.1%", "Online"],
  ["SM-02", "Norte", "Humedad suelo", "32.7%", "98.8%", "Online"],
  ["ST-01", "Norte", "Temperatura suelo", "21.4°C", "99.6%", "Online"],
  ["EC-01", "Norte", "Conductividad", "1.7 mS/cm", "97.4%", "Online"],
  ["SM-03", "Centro", "Humedad suelo", "27.6%", "99.0%", "Online"],
  ["ST-02", "Centro", "Temperatura suelo", "22.1°C", "99.3%", "Online"],
  ["EC-02", "Centro", "Conductividad", "1.9 mS/cm", "96.9%", "Online"],
  ["SM-04", "Sur", "Humedad suelo", "30.9%", "98.7%", "Online"],
  ["ST-03", "Sur", "Temperatura suelo", "20.8°C", "99.2%", "Online"],
  ["WX-01", "General", "Temperatura ambiente", "24.2°C", "99.8%", "Online"],
  ["RH-01", "General", "Humedad ambiente", "68%", "99.5%", "Online"],
  ["RAIN-01", "General", "Lluvia 24h", "2.6 mm", "98.9%", "Online"],
];

const weather = [
  { time: "Ahora", temp: 24, rain: "10%", desc: "Parcial" },
  { time: "+12h", temp: 20, rain: "64%", desc: "Lluvia" },
  { time: "+24h", temp: 25, rain: "25%", desc: "Nublado" },
  { time: "+48h", temp: 27, rain: "12%", desc: "Seco" },
];

const suggestions = [
  {
    title: "Reducir riego 12%",
    desc: "Humedad sobre objetivo + lluvia probable en 12 h.",
    badge: "Alta prioridad",
  },
  {
    title: "Revisar zona noreste",
    desc: "Se detecta una desviación persistente frente a zonas comparables.",
    badge: "Anomalía",
  },
  {
    title: "Mantener fertilización",
    desc: "No hay evidencia suficiente para modificar el programa actual.",
    badge: "Sin cambio",
  },
];

const govProducts = [
  { name: "Berries", pct: 32, color: "#7d4258" },
  { name: "Agave", pct: 27, color: "#5c7b79" },
  { name: "Maíz", pct: 24, color: "#9d8740" },
  { name: "Aguacate", pct: 17, color: "#5a7a49" },
];

let govZones = {
  1: {
    name: "Municipio 1",
    product: "Berries",
    risk: 12,
    water: 18,
    units: 28,
  },
  2: { name: "Municipio 2", product: "Agave", risk: 8, water: 11, units: 31 },
  3: { name: "Municipio 3", product: "Maíz", risk: 29, water: 24, units: 35 },
  4: {
    name: "Municipio 4",
    product: "Berries",
    risk: 16,
    water: 19,
    units: 26,
  },
  5: {
    name: "Municipio 5",
    product: "Aguacate",
    risk: 21,
    water: 14,
    units: 28,
  },
};

function generateMunicipalityMeta(count = 60) {
  const order = ["Berries", "Agave", "Maíz", "Aguacate"];
  govZones = {};
  for (let i = 1; i <= count; i += 1) {
    const product = order[(i - 1) % order.length];
    const risk = (12 + ((i * 7) % 27) + (i % 3) * 4) % 31;
    const water = (10 + ((i * 5) % 20) + (i % 4) * 3) % 28;
    govZones[i] = {
      name: `Municipio ${i}`,
      product,
      risk,
      water,
      units: 18 + ((i * 13) % 22),
    };
  }
}

function buildMunicipalityMap() {
  const layer = document.getElementById("municipalityLayer");
  if (!layer) return;

  layer.innerHTML = "";

  fetch("./Blank_map_of_Jalisco.svg")
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo cargar el SVG");
      return response.text();
    })
    .then((svgText) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
      const allPaths = Array.from(svgDoc.querySelectorAll("path[d]")).filter(
        (path) => {
          const style = path.getAttribute("style") || "";
          const fill = path.getAttribute("fill");
          return (
            path.getAttribute("d") &&
            !path.closest("defs") &&
            fill !== "none" &&
            !/fill\s*:\s*none/i.test(style)
          );
        },
      );

      const selected = allPaths.length ? allPaths : [];
      generateMunicipalityMeta(selected.length || 60);

      selected.forEach((pathNode, index) => {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path.setAttribute("d", pathNode.getAttribute("d"));
        const sourceGroup = pathNode.closest("g[transform]");
        if (sourceGroup) {
          path.setAttribute("transform", sourceGroup.getAttribute("transform"));
        }
        path.setAttribute("class", "municipality-shape");
        path.dataset.zone = String(index + 1);
        path.dataset.name =
          govZones[index + 1]?.name || `Municipio ${index + 1}`;
        path.setAttribute("fill", pathNode.getAttribute("fill") || "#dfe8e2");
        path.setAttribute("stroke", "rgba(11, 24, 17, 0.9)");
        layer.appendChild(path);
      });

      if (!selected.length) {
        const fallbackPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        fallbackPath.setAttribute(
          "d",
          "M170,155 L250,110 L330,105 L395,140 L370,210 L300,225 L225,210 L180,170 Z M398,120 L520,104 L620,138 L680,180 L690,240 L610,266 L505,248 L440,200 Z M150,220 L238,208 L295,242 L280,322 L205,360 L138,335 L120,272 Z M286,234 L430,216 L532,246 L520,336 L434,394 L320,362 L275,300 Z M510,242 L636,262 L704,298 L710,370 L646,426 L560,422 L514,338 Z",
        );
        fallbackPath.setAttribute("class", "municipality-shape");
        fallbackPath.dataset.zone = "1";
        fallbackPath.dataset.name = "Municipio 1";
        layer.appendChild(fallbackPath);
      }

      bindMunicipalityInteractions();
      renderGovernment();
    })
    .catch(() => {
      generateMunicipalityMeta(5);
      layer.innerHTML = `
        <path class="municipality-shape" data-zone="1" d="M170,155 L250,110 L330,105 L395,140 L370,210 L300,225 L225,210 L180,170 Z"></path>
        <path class="municipality-shape" data-zone="2" d="M398,120 L520,104 L620,138 L680,180 L690,240 L610,266 L505,248 L440,200 Z"></path>
        <path class="municipality-shape" data-zone="3" d="M150,220 L238,208 L295,242 L280,322 L205,360 L138,335 L120,272 Z"></path>
        <path class="municipality-shape" data-zone="4" d="M286,234 L430,216 L532,246 L520,336 L434,394 L320,362 L275,300 Z"></path>
        <path class="municipality-shape" data-zone="5" d="M510,242 L636,262 L704,298 L710,370 L646,426 L560,422 L514,338 Z"></path>
      `;
      bindMunicipalityInteractions();
      renderGovernment();
    });
}

function bindMunicipalityInteractions() {
  const shapes = document.querySelectorAll(".municipality-shape");
  shapes.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const z = govZones[Number(el.dataset.zone)] || {
        name: el.dataset.name || "Municipio",
        product: "Berries",
        risk: 20,
        water: 18,
        units: 20,
      };
      const tip = document.getElementById("regionTooltip");
      tip.style.display = "block";
      tip.style.left = `${e.offsetX + 14}px`;
      tip.style.top = `${e.offsetY + 14}px`;
      tip.innerHTML = `<strong>${z.name}</strong><br>${z.product}<br>Riesgo: ${z.risk}% · ${z.units} unidades`;
    });
    el.addEventListener("mouseleave", () => {
      document.getElementById("regionTooltip").style.display = "none";
    });
  });
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function showToast(text) {
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}

function markDataRefresh() {
  const sync = document.getElementById("lastSync");
  if (sync) sync.textContent = "Actualizado ahora";
}

function setSection(id) {
  state.section = id;
  $$(".page-section").forEach((el) => el.classList.remove("active-section"));
  $$(".nav-item").forEach((el) => el.classList.remove("active"));
  $("#" + id).classList.add("active-section");
  document
    .querySelector(`.nav-item[data-section="${id}"]`)
    .classList.add("active");
  const meta = {
    overview: [
      "RESUMEN EJECUTIVO",
      "Panel de inteligencia productiva",
      "Monitoreo, predicción y decisiones sobre unidades productivas.",
    ],
    field: [
      "PARCELA INTELIGENTE",
      "Operación de parcela",
      "Mapa de calor, sensores, decisiones y trazabilidad.",
    ],
    ai: [
      "ASISTENCIA IA",
      "Copiloto agronómico",
      "Interfaz explicable sobre datos, reglas y modelos.",
    ],
    government: [
      "VISTA TERRITORIAL",
      "Inteligencia regional",
      "Segmentación productiva, riesgo y planeación territorial.",
    ],
  }[id];
  $("#breadcrumbCurrent").textContent = meta[0];
  $("#pageTitle").textContent = meta[1];
  $("#pageSubtitle").textContent = meta[2];
  $$(".nav-item").forEach((item) => {
    if (item.dataset.section === id) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });

  if (id === "field") {
    drawFieldHeatmap();
    drawHistoryChart();
  }
  if (id === "government") {
    renderGovernment();
    drawGovProductionChart();
  }
}

function rand(seed) {
  const x = Math.sin(seed * 999.13) * 43758.5453;
  return x - Math.floor(x);
}

function metricValue(nx, ny, metric, cropKey, variant = 0) {
  const crop = crops[cropKey];
  const wave =
    Math.sin(nx * 7.1 + variant) * 0.9 + Math.cos(ny * 8.4 - variant) * 0.7;
  const blob1 = Math.exp(-((nx - 0.73) ** 2 + (ny - 0.25) ** 2) / 0.035);
  const blob2 = Math.exp(-((nx - 0.3) ** 2 + (ny - 0.65) ** 2) / 0.06);
  const noise =
    (rand(((nx * 1000) | 0) + ((ny * 2000) | 0) + variant * 13) - 0.5) * 0.8;

  if (metric === "moisture")
    return crop.targetMoisture + wave * 2.4 + blob1 * 6 - blob2 * 4 + noise;
  if (metric === "temperature") return 21 + wave * 1.5 + blob2 * 2.3 + noise;
  if (metric === "stress")
    return Math.max(
      0,
      Math.min(100, 28 + blob2 * 52 - blob1 * 18 + wave * 8 + noise * 4),
    );
  if (metric === "yield")
    return (
      crop.baseYield + blob1 * 1.3 - blob2 * 1.8 + wave * 0.4 + noise * 0.2
    );
  if (metric === "health")
    return Math.max(0, Math.min(100, 80 + blob1 * 12 - blob2 * 25 + wave * 3));
  return 0;
}

function heatColor(v, metric, cropKey) {
  const crop = crops[cropKey];
  let t = 0;
  if (metric === "moisture")
    t = Math.max(0, Math.min(1, (v - (crop.targetMoisture - 8)) / 16));
  if (metric === "temperature") t = Math.max(0, Math.min(1, (v - 16) / 12));
  if (metric === "stress") t = Math.max(0, Math.min(1, v / 100));
  if (metric === "yield")
    t = Math.max(0, Math.min(1, (v - (crop.baseYield - 2.5)) / 5));
  if (metric === "health") t = Math.max(0, Math.min(1, v / 100));

  if (metric === "stress") {
    const r = Math.round(68 + 150 * t),
      g = Math.round(130 - 75 * t),
      b = Math.round(80 - 45 * t);
    return `rgb(${r},${g},${b})`;
  }
  const stops = [
    [0, [126, 63, 63]],
    [0.35, [203, 169, 94]],
    [0.58, [112, 153, 120]],
    [1, [38, 91, 59]],
  ];
  let a = stops[0],
    b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++)
    if (t >= stops[i][0] && t <= stops[i + 1][0]) {
      a = stops[i];
      b = stops[i + 1];
      break;
    }
  const k = (t - a[0]) / (b[0] - a[0] || 1);
  const c = a[1].map((x, i) => Math.round(x + (b[1][i] - x) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function drawHeatmap(canvas, metric, cropKey, variant = 0) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width,
    h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#e8ece7";
  ctx.fillRect(0, 0, w, h);

  const cols = 48,
    rows = 28,
    cellW = w / cols,
    cellH = h / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const nx = x / (cols - 1),
        ny = y / (rows - 1);
      const value = metricValue(nx, ny, metric, cropKey, variant);
      ctx.fillStyle = heatColor(value, metric, cropKey);
      ctx.globalAlpha = 0.93;
      ctx.fillRect(x * cellW, y * cellH, cellW + 1, cellH + 1);
    }
  }
  ctx.globalAlpha = 1;

  // parcel line pattern
  ctx.strokeStyle = "rgba(255,255,255,.24)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 30 + i * 45);
    ctx.lineTo(w, 10 + i * 45);
    ctx.stroke();
  }
  // outer border irregular-ish
  ctx.strokeStyle = "rgba(31,55,38,.65)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(18, 18);
  ctx.lineTo(w - 35, 10);
  ctx.lineTo(w - 12, h - 42);
  ctx.lineTo(w * 0.72, h - 15);
  ctx.lineTo(w * 0.33, h - 20);
  ctx.lineTo(20, h - 58);
  ctx.closePath();
  ctx.stroke();
}

function drawOverviewHeatmap() {
  drawHeatmap(
    $("#overviewHeatmap"),
    state.overviewMetric,
    $("#overviewCropSelect").value,
    1,
  );
}

function drawFieldHeatmap() {
  drawHeatmap(
    $("#fieldHeatmap"),
    state.fieldMetric,
    state.currentCrop,
    fields[state.currentField].area,
  );
  $("#fieldMapTitle").textContent =
    `${metricLabel(state.fieldMetric)} · Parcela ${fields[state.currentField].name}`;
  renderSensorPins();
}

function metricLabel(m) {
  return (
    {
      moisture: "Humedad del suelo",
      temperature: "Temperatura del suelo",
      stress: "Índice de estrés",
      yield: "Rendimiento proyectado",
      health: "Salud del cultivo",
    }[m] || m
  );
}

function getParcelAnalytics() {
  return parcelAnalytics[state.currentField];
}

function drawTrendChart(canvasId, values, color, unit = "") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pad = 14;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#e3ebe4";
  ctx.lineWidth = 1;
  [0.25, 0.5, 0.75].forEach((level) => {
    const y = pad + (height - pad * 2) * level;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  });
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = pad + (index * (width - pad * 2)) / (values.length - 1);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    index ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
  values.forEach((value, index) => {
    const x = pad + (index * (width - pad * 2)) / (values.length - 1);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
    if (index === values.length - 1) {
      ctx.fillStyle = "#526057";
      ctx.font = "600 10px sans-serif";
      ctx.fillText(
        `${value.toFixed(unit === " t/ha" ? 1 : 1)}${unit}`,
        Math.max(0, x - 42),
        Math.max(12, y - 9),
      );
    }
  });
}

function renderAIAnalytics() {
  const analytics = getParcelAnalytics();
  const field = fields[state.currentField];
  const crop = crops[state.currentCrop];
  const moistureDelta = analytics.history.at(-1) - analytics.history[0];
  const yieldValues = analytics.yield.map(
    (value) => value + (crop.baseYield - 14.9),
  );
  $("#aiMoisture").textContent = `${field.moisture.toFixed(1)}%`;
  $("#aiNdvi").textContent = analytics.ndvi.at(-1).toFixed(2);
  $("#aiEfficiency").textContent = `${analytics.irrigation.efficiency}%`;
  $("#aiAnomalies").textContent = String(analytics.anomalies);
  $("#aiMoistureTrend").textContent =
    `${moistureDelta >= 0 ? "+" : ""}${moistureDelta.toFixed(1)} pts`;
  $("#aiYieldTrend").textContent = `${yieldValues.at(-1).toFixed(1)} t/ha`;
  drawTrendChart("aiMoistureChart", analytics.history, "#3f7654", "%");
  drawTrendChart("aiYieldChart", yieldValues, "#9a7b3d", " t/ha");
}

function renderSensorPins() {
  const layer = $("#sensorLayer");
  layer.innerHTML = "";
  const coords = [
    [18, 21],
    [37, 35],
    [60, 24],
    [75, 45],
    [29, 68],
    [55, 72],
    [81, 70],
  ];
  coords.forEach((c, i) => {
    const pin = document.createElement("div");
    pin.className = "sensor-pin";
    pin.style.left = `${c[0]}%`;
    pin.style.top = `${c[1]}%`;
    pin.title = `Sensor ${i + 1}`;
    layer.appendChild(pin);
  });
}

function drawHistoryChart() {
  const c = $("#historyChart"),
    ctx = c.getContext("2d"),
    w = c.width,
    h = c.height;
  ctx.clearRect(0, 0, w, h);
  const pad = 34,
    min = 20,
    max = 36;
  ctx.strokeStyle = "#e1e6e2";
  ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
    const y = pad + (h - 2 * pad) * t;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - pad, y);
    ctx.stroke();
  });
  const pts = state.moistureHistory.map((v, i) => [
    pad + (i * (w - 2 * pad)) / (state.moistureHistory.length - 1),
    h - pad - ((v - min) / (max - min)) * (h - 2 * pad),
  ]);
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  pts.slice(1).forEach((p) => ctx.lineTo(...p));
  ctx.strokeStyle = "#2d7048";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#2d7048";
  pts.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawYieldChart() {
  const c = $("#yieldChart"),
    ctx = c.getContext("2d"),
    w = c.width,
    h = c.height;
  ctx.clearRect(0, 0, w, h);
  const vals = [13.7, 13.9, 14.1, 14.3, 14.6, 14.8, 14.9];
  const min = 13,
    max = 15.5,
    pad = 22;
  ctx.beginPath();
  vals.forEach((v, i) => {
    const x = pad + (i * (w - 2 * pad)) / (vals.length - 1),
      y = h - pad - ((v - min) / (max - min)) * (h - 2 * pad);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.strokeStyle = "#3d7250";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "#e1e6e2";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, h - pad);
  ctx.lineTo(w - pad, h - pad);
  ctx.stroke();
}

function drawGovProductionChart() {
  const c = $("#govProductionChart"),
    ctx = c.getContext("2d"),
    w = c.width,
    h = c.height;
  ctx.clearRect(0, 0, w, h);
  const vals = [12.8, 10.9, 9.7, 8.4],
    labels = ["Berries", "Agave", "Maíz", "Aguacate"],
    colors = ["#7d4258", "#5c7b79", "#9d8740", "#5a7a49"];
  const max = 14,
    pad = 45,
    barW = 80,
    gap = (w - 2 * pad - vals.length * barW) / (vals.length - 1);
  vals.forEach((v, i) => {
    const x = pad + i * (barW + gap),
      bh = (v / max) * (h - 80),
      y = h - 40 - bh;
    ctx.fillStyle = colors[i];
    ctx.fillRect(x, y, barW, bh);
    ctx.fillStyle = "#526057";
    ctx.font = "12px Inter";
    ctx.fillText(labels[i], x, h - 18);
    ctx.fillStyle = "#152019";
    ctx.font = "600 12px Inter";
    ctx.fillText(`${v}K t`, x, y - 8);
  });
}

function renderSuggestions() {
  $("#suggestionList").innerHTML = suggestions
    .map(
      (s) => `
    <div class="suggestion">
      <div class="sug-top"><strong>${s.title}</strong><span class="sug-badge">${s.badge}</span></div>
      <p>${s.desc}</p>
    </div>`,
    )
    .join("");
}

function renderWeather() {
  $("#weatherTimeline").innerHTML = weather
    .map(
      (w) => `
    <div class="weather-slot">
      <span>${w.time}</span><strong>${w.temp}°</strong><small>${w.rain} lluvia</small><small>${w.desc}</small>
    </div>`,
    )
    .join("");
}

function renderDecisionTimeline() {
  $("#decisionTimeline").innerHTML = state.decisions
    .map(
      (d) => `
    <div class="decision-item">
      <span class="decision-dot"></span>
      <div><strong>${d.title}</strong><span>${d.date} · ${d.note}</span></div>
    </div>`,
    )
    .join("");
}

function renderFeatureImportance() {
  const arr = [
    ["Humedad suelo", 31],
    ["Etapa fenológica", 24],
    ["Clima", 19],
    ["Historial riego", 16],
    ["NDVI/NDMI", 10],
  ];
  $("#featureImportance").innerHTML = arr
    .map(
      ([n, v]) => `
    <div class="feature-row"><span>${n}</span><div class="feature-bar"><span style="width:${v * 2.7}%"></span></div><strong>${v}%</strong></div>
  `,
    )
    .join("");
}

function renderRiskBars() {
  const vals = [18, 15, 14, 12, 13, 11, 12];
  $("#riskBars").innerHTML = vals
    .map((v) => `<div style="height:${v * 4}px"></div>`)
    .join("");
}

function renderSensors() {
  $("#sensorTable").innerHTML = sensors
    .map(
      (s) => `
    <tr><td><strong>${s[0]}</strong></td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td><td>${s[4]}</td><td><span class="data-status">${s[5]}</span></td></tr>
  `,
    )
    .join("");
}

function updateFieldData() {
  const f = fields[state.currentField],
    c = crops[state.currentCrop];
  $("#fieldMoisture").textContent = `${f.moisture.toFixed(1)}%`;
  $("#fieldTemp").textContent = `${f.temp.toFixed(1)}°C`;
  $("#fieldEC").textContent = `${c.ec.toFixed(1)} mS/cm`;
  $("#fieldNdvi").textContent = c.ndvi.toFixed(2);
  $("#fieldEt").textContent = `${c.et.toFixed(1)} mm/d`;
  $("#aiCrop").textContent = c.name;
  $("#aiField").textContent = f.name;
  const delta = f.moisture - c.targetMoisture;
  if (delta > 2) {
    $("#fieldRecommendation").textContent = "Reducir riego 12%";
    $("#fieldRecommendationText").textContent =
      "La humedad se encuentra sobre el objetivo y el pronóstico sugiere baja necesidad adicional.";
    $("#fieldConfidence").textContent = "88%";
  } else if (delta < -2) {
    $("#fieldRecommendation").textContent = "Incrementar riego 10%";
    $("#fieldRecommendationText").textContent =
      "La humedad está por debajo del objetivo y el riesgo de estrés aumenta durante las próximas 36 horas.";
    $("#fieldConfidence").textContent = "91%";
  } else {
    $("#fieldRecommendation").textContent = "Mantener riego actual";
    $("#fieldRecommendationText").textContent =
      "Las variables principales permanecen dentro del rango esperado.";
    $("#fieldConfidence").textContent = "84%";
  }
  renderAIAnalytics();
}

function simulateReading() {
  const f = fields[state.currentField],
    c = crops[state.currentCrop];
  f.moisture = +(c.targetMoisture - 4 + Math.random() * 9).toFixed(1);
  f.temp = +(19 + Math.random() * 5).toFixed(1);
  state.moistureHistory.shift();
  state.moistureHistory.push(f.moisture);
  const analytics = getParcelAnalytics();
  analytics.history.shift();
  analytics.history.push(f.moisture);
  analytics.ndvi.push(
    +(analytics.ndvi.at(-1) + (Math.random() - 0.5) * 0.02).toFixed(2),
  );
  analytics.ndvi.shift();
  updateFieldData();
  drawFieldHeatmap();
  drawHistoryChart();
  showToast("Nueva lectura simulada procesada");
}

function renderGovernment() {
  const productMode = state.govMapMode === "product";
  const riskMode = state.govMapMode === "risk";
  const colors = {
    Berries: "#7d4258",
    Agave: "#5c7b79",
    Maíz: "#9d8740",
    Aguacate: "#5a7a49",
  };
  $$(".municipality-shape, .region-shape").forEach((el) => {
    const z = govZones[Number(el.dataset.zone)] || {
      name: el.dataset.name || "Municipio",
      product: "Berries",
      risk: 20,
      water: 18,
      units: 20,
    };
    let fill;
    if (productMode) fill = colors[z.product] || "#6c8768";
    else if (riskMode) {
      const t = (z.risk || 20) / 30;
      fill = `rgb(${Math.round(83 + 100 * t)},${Math.round(133 - 55 * t)},${Math.round(88 - 30 * t)})`;
    } else {
      const t = (z.water || 18) / 25;
      fill = `rgb(${Math.round(115 - 45 * t)},${Math.round(150 - 40 * t)},${Math.round(160 + 50 * t)})`;
    }
    el.style.fill = fill;
  });

  if (productMode) {
    $("#govLegend").innerHTML = Object.entries(colors)
      .map(([n, c]) => `<span><i style="background:${c}"></i>${n}</span>`)
      .join("");
  } else if (riskMode) {
    $("#govLegend").innerHTML =
      `<span><i style="background:#578658"></i>Bajo riesgo</span><span><i style="background:#ba6a52"></i>Alto riesgo</span>`;
  } else {
    $("#govLegend").innerHTML =
      `<span><i style="background:#7297a1"></i>Menor disponibilidad</span><span><i style="background:#47737f"></i>Mayor disponibilidad</span>`;
  }

  $("#productBreakdown").innerHTML = govProducts
    .map(
      (p) => `
    <div class="product-row"><span>${p.name}</span><div class="product-bar"><i style="width:${p.pct * 3}%;background:${p.color}"></i></div><strong>${p.pct}%</strong></div>
  `,
    )
    .join("");

  $("#govAlerts").innerHTML = `
    <div class="gov-alert"><strong>Zona Oeste · riesgo hídrico elevado</strong><span>29% de superficie bajo condición de atención.</span></div>
    <div class="gov-alert"><strong>Berries · variabilidad de producción</strong><span>Desviación de 7.4% frente al escenario base.</span></div>
    <div class="gov-alert"><strong>17% de unidades con datos incompletos</strong><span>Priorizar asistencia técnica / conectividad.</span></div>
  `;
}

function answerAI(question) {
  const q = question.toLowerCase();
  const f = fields[state.currentField],
    c = crops[state.currentCrop],
    analytics = getParcelAnalytics();
  const moistureDelta = f.moisture - c.targetMoisture;
  const waterGap = analytics.irrigation.applied - analytics.irrigation.demand;
  const riskScore = Math.max(
    8,
    Math.min(
      92,
      Math.round(35 + Math.abs(moistureDelta) * 7 + analytics.anomalies * 4),
    ),
  );
  if (q.includes("por qué") || q.includes("porque") || q.includes("riego")) {
    const action =
      moistureDelta > 2
        ? "reducir"
        : moistureDelta < -2
          ? "incrementar"
          : "mantener";
    return `Para ${f.name}, sugiero ${action} el riego porque la humedad está en ${f.moisture.toFixed(1)}% frente al objetivo de ${c.targetMoisture}%, con una demanda estimada de ${analytics.irrigation.demand.toFixed(1)} mm y ${analytics.irrigation.applied.toFixed(1)} mm aplicados. La lluvia de 12 horas aporta una señal adicional de 64%. Validaría la decisión con una lectura manual antes de ejecutarla.`;
  }
  if (q.includes("mayor riesgo") || q.includes("riesgo")) {
    const rankedField = Object.entries(parcelAnalytics)
      .map(([key, item]) => ({
        key,
        score:
          Math.abs(
            fields[key].moisture - crops[state.currentCrop].targetMoisture,
          ) +
          item.anomalies * 0.8,
      }))
      .sort((a, b) => b.score - a.score)[0];
    return `La Parcela ${fields[rankedField.key].name} concentra el mayor riesgo relativo en este corte, con ${parcelAnalytics[rankedField.key].anomalies} anomalías y una variación de humedad más marcada. En la parcela activa ${f.name}, el riesgo estimado es ${riskScore}/100. Priorizaría inspección de emisores, lectura manual y revisión del drenaje.`;
  }
  if (q.includes("resume") || q.includes("estado")) {
    return `${c.name} en Parcela ${f.name}: humedad ${f.moisture.toFixed(1)}%, temperatura del suelo ${f.temp.toFixed(1)}°C, NDVI ${analytics.ndvi.at(-1).toFixed(2)}, eficiencia hídrica ${analytics.irrigation.efficiency}% y ${analytics.anomalies} anomalías en 7 días. La tendencia de humedad es ${moistureDelta >= 0 ? "ascendente" : "descendente"}; el punto de atención es la uniformidad del riego.`;
  }
  if (q.includes("clima")) {
    return `El escenario simulado marca 64% de lluvia en las próximas 12 horas y una ventana más seca después. Para ${f.name}, la demanda hídrica calculada es ${analytics.irrigation.demand.toFixed(1)} mm; esperaría a la precipitación y revisaría humedad en las siguientes 6 horas.`;
  }
  if (q.includes("rendimiento")) {
    return `El rendimiento proyectado para ${c.name} en ${f.name} es ${analytics.yield.at(-1).toFixed(1)} t/ha, con una tendencia de ${(analytics.yield.at(-1) - analytics.yield[0] >= 0 ? "+" : "") + (analytics.yield.at(-1) - analytics.yield[0]).toFixed(1)} t/ha en 7 cortes. La estimación es dummy y depende de humedad, NDVI, clima y etapa fenológica.`;
  }
  if (q.includes("balance") || q.includes("agua")) {
    return `El balance de ${f.name} está ${waterGap > 0 ? "por encima de la demanda" : "por debajo de la demanda"}: ${analytics.irrigation.applied.toFixed(1)} mm aplicados frente a ${analytics.irrigation.demand.toFixed(1)} mm requeridos. La eficiencia estimada es ${analytics.irrigation.efficiency}%, por lo que revisaría presión y uniformidad antes de aumentar el volumen.`;
  }
  if (q.includes("estrés") || q.includes("senales") || q.includes("señales")) {
    return `Hay ${analytics.anomalies} señales anómalas en los últimos 7 días. El NDVI actual es ${analytics.ndvi.at(-1).toFixed(2)} y la humedad está ${Math.abs(moistureDelta).toFixed(1)} puntos ${moistureDelta >= 0 ? "sobre" : "bajo"} el objetivo. Revisaría primero el sector con menor caudal y compararía una lectura de suelo manual.`;
  }
  if (q.includes("reviso") || q.includes("hoy") || q.includes("campo")) {
    return `Hoy revisaría tres cosas en ${f.name}: uniformidad de emisores, humedad en los extremos del bloque y el sector que explica las ${analytics.anomalies} anomalías. La última inspección fue ${analytics.lastInspection}; documentaría fotos, caudal y lectura manual para recalibrar la recomendación.`;
  }
  return `Puedo analizar ${f.name} con datos internos de humedad, NDVI, riego, eficiencia, anomalías, clima y rendimiento. Prueba con “balance de agua”, “señales de estrés” o “qué reviso hoy en campo”.`;
}

function addMessage(role, text) {
  const wrap = document.createElement("div");
  wrap.className = `message ${role}`;
  wrap.innerHTML = `<div class="message-meta">${role === "assistant" ? "Agro Copilot" : "Usuario"}</div><div class="message-bubble">${text}</div>`;
  $("#chatMessages").appendChild(wrap);
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
}

function exportCSV() {
  const rows = [
    ["id", "parcela", "variable", "lectura", "calidad", "estado"],
    ...sensors,
  ];
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "agro-intelligence-sensores.csv";
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("CSV generado");
}

function initEvents() {
  $$(".nav-item").forEach((b) =>
    b.addEventListener("click", () => {
      setSection(b.dataset.section);
      document.body.classList.remove("mobile-nav-open");
    }),
  );
  $$(".mode-btn").forEach((b) =>
    b.addEventListener("click", () => {
      $$(".mode-btn").forEach((x) => x.classList.remove("active"));
      $$(".mode-btn").forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.classList.add("active");
      b.setAttribute("aria-pressed", "true");
      state.mode = b.dataset.mode;
      if (state.mode === "government") setSection("government");
      else setSection("overview");
    }),
  );

  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      document.body.classList.toggle("mobile-nav-open");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      document.body.classList.remove("mobile-nav-open");
    });
  }

  $("#overviewCropSelect").addEventListener("change", drawOverviewHeatmap);
  $("#overviewMetricSelect").addEventListener("change", (e) => {
    state.overviewMetric = e.target.value;
    drawOverviewHeatmap();
  });

  $("#fieldSelector").addEventListener("change", (e) => {
    state.currentField = e.target.value;
    updateFieldData();
    drawFieldHeatmap();
  });
  $("#cropSelector").addEventListener("change", (e) => {
    state.currentCrop = e.target.value;
    updateFieldData();
    drawFieldHeatmap();
  });
  $$("#fieldMetricTabs .seg-btn").forEach((b) =>
    b.addEventListener("click", () => {
      $$("#fieldMetricTabs .seg-btn").forEach((x) =>
        x.classList.remove("active"),
      );
      b.classList.add("active");
      state.fieldMetric = b.dataset.metric;
      drawFieldHeatmap();
    }),
  );
  $("#simulateReadingBtn").addEventListener("click", simulateReading);
  $("#applyRecommendationBtn").addEventListener("click", () => {
    const rec = $("#fieldRecommendation").textContent;
    state.decisions.unshift({
      date: "Ahora",
      title: rec,
      note: `Parcela ${fields[state.currentField].name} · registrada desde MVP`,
    });
    renderDecisionTimeline();
    showToast("Decisión registrada en trazabilidad");
  });

  $("#aiForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("#aiInput").value.trim();
    if (!q) return;
    addMessage("user", q);
    $("#aiInput").value = "";
    setTimeout(() => addMessage("assistant", answerAI(q)), 250);
  });
  $$(".prompt-chip").forEach((b) =>
    b.addEventListener("click", () => {
      const q = b.textContent;
      addMessage("user", q);
      setTimeout(() => addMessage("assistant", answerAI(q)), 220);
    }),
  );

  $$("#govMapMode .seg-btn").forEach((b) =>
    b.addEventListener("click", () => {
      $$("#govMapMode .seg-btn").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.govMapMode = b.dataset.mode;
      renderGovernment();
    }),
  );

  $$(".region-shape").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const z = govZones[el.dataset.zone],
        tip = $("#regionTooltip");
      tip.style.display = "block";
      tip.style.left = `${e.offsetX + 14}px`;
      tip.style.top = `${e.offsetY + 14}px`;
      tip.innerHTML = `<strong>${z.name}</strong><br>${z.product}<br>Riesgo: ${z.risk}% · ${z.units} unidades`;
    });
    el.addEventListener(
      "mouseleave",
      () => ($("#regionTooltip").style.display = "none"),
    );
  });

  $("#refreshAllBtn").addEventListener("click", () => {
    simulateReading();
    drawOverviewHeatmap();
    renderGovernment();
    markDataRefresh();
    showToast("Datos generales actualizados");
  });
}

function init() {
  renderSuggestions();
  renderWeather();
  renderDecisionTimeline();
  buildMunicipalityMap();
  renderGovernment();
  updateFieldData();
  drawOverviewHeatmap();
  drawFieldHeatmap();
  drawHistoryChart();
  drawGovProductionChart();
  initEvents();
}
window.addEventListener("DOMContentLoaded", init);
