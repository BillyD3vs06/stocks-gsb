// ===== INSTALLNING =====
const API_KEY = "d7j2hlpr01qp3g1rii80d7j2hlpr01qp3g1rii8g"; // byt ut denna till din riktiga Finnhub-nyckel
const SYMBOL = "GLD";
const STORAGE_KEY = `stock:${SYMBOL}`;

function setStatus(message) {
  const status = document.getElementById("status");
  if (status) {
    status.innerText = message;
  }
}

function formatValue(value) {
  if (typeof value !== "number" || Number.isNaN(value) || value === 0) {
    return "-";
  }

  return value.toFixed(2);
}

// ===== HAMTA SPARAD DATA VID START =====
function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return;
  }

  try {
    const data = JSON.parse(saved);
    updateUI(data, "Visar senast sparade data.");
  } catch (error) {
    console.error("Kunde inte lasa sparad data:", error);
  }
}

// ===== UPPDATERA UI =====
function updateUI(data, statusMessage = "Live-data uppdaterad.") {
  document.getElementById("symbol").innerText = SYMBOL;
  document.getElementById("price").innerText = formatValue(data.c);
  document.getElementById("high").innerText = formatValue(data.h);
  document.getElementById("low").innerText = formatValue(data.l);
  document.getElementById("updated").innerText = new Date().toLocaleTimeString();
  setStatus(statusMessage);
}

// ===== SPARA DATA =====
function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function hasValidQuote(data) {
  return data && typeof data.c === "number" && typeof data.h === "number" && typeof data.l === "number";
}

// ===== HAMTA DATA FRAN FINNHUB =====
async function getPrice() {
  if (!API_KEY || API_KEY === "apks") {
    setStatus("Lagg in en riktig Finnhub API-nyckel i livedata.js.");
    return;
  }

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${SYMBOL}&token=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!hasValidQuote(data)) {
      setStatus("Kunde inte hamta giltig kursdata just nu.");
      return;
    }

    updateUI(data);
    saveToLocalStorage(data);
  } catch (error) {
    console.error("Fel vid hamtning:", error);
    setStatus("Fel vid hamtning av live-data.");
  }
}

// ===== START =====
loadFromLocalStorage();
getPrice();

// ===== LIVE UPPDATERING =====
setInterval(getPrice, 5000);
