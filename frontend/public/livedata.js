// ===== INSTÄLLNING =====
const API_KEY = "d7klhvhr01qiqbcusjn0d7klhvhr01qiqbcusjng"; // <-- byt till din riktiga key
const SYMBOL = "GLD"; // AAPL, GLD (guld), USO (olja)
const STORAGE_KEY = `stock:${SYMBOL}`;

// ===== STATUS =====
function setStatus(msg) {
  const el = document.getElementById("status");
  if (el) el.innerText = msg;
}

// ===== FORMAT =====
function formatValue(value) {
  if (typeof value !== "number" || isNaN(value)) return "-";
  return "$" + value.toFixed(2);
}

// ===== LOAD CACHE =====
function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    updateUI(data, "Visar sparad data");
  } catch (e) {
    console.error(e);
  }
}

// ===== UI =====
function updateUI(data, msg = "Live uppdaterad") {
  document.getElementById("symbol").innerText = SYMBOL;
  document.getElementById("price").innerText = formatValue(data.c);
  document.getElementById("high").innerText = formatValue(data.h);
  document.getElementById("low").innerText = formatValue(data.l);
  document.getElementById("updated").innerText =
    new Date().toLocaleTimeString();

  setStatus(msg);
}

// ===== SAVE =====
function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===== VALIDERA =====
function isValid(data) {
  return data && typeof data.c === "number";
}

// ===== HÄMTA PRIS =====
async function getPrice() {
  try {
    setStatus("Hämtar...");

    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${SYMBOL}&token=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    console.log("DATA:", data); // debug

    if (!isValid(data)) {
      setStatus("Ingen giltig data");
      return;
    }

    updateUI(data);
    saveToLocalStorage(data);

  } catch (err) {
    console.error("ERROR:", err);
    setStatus("Fel vid hämtning");
  }
}

// ===== START =====
loadFromLocalStorage();
getPrice();

// ===== LIVE =====
setInterval(getPrice, 5000);