// ===== INSTÄLLNING =====
const API_KEY = "apks"; // <-- byt ut denna
const SYMBOL = "AAPL"; // ändra till valfri aktie

// ===== HÄMTA SPARAD DATA VID START =====
function loadFromLocalStorage() {
  const saved = localStorage.getItem(SYMBOL);
  if (saved) {
    const data = JSON.parse(saved);
    updateUI(data);
  }
}

// ===== UPPDATERA UI =====
function updateUI(data) {
  document.getElementById("price").innerText = data.c;
  document.getElementById("high").innerText = data.h;
  document.getElementById("low").innerText = data.l;
  document.getElementById("updated").innerText =
    new Date().toLocaleTimeString();
}

// ===== SPARA DATA =====
function saveToLocalStorage(data) {
  localStorage.setItem(SYMBOL, JSON.stringify(data));
}

// ===== HÄMTA DATA FRÅN FINNHUB =====
async function getPrice() {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${SYMBOL}&token=${API_KEY}`
    );
    const data = await res.json();

    updateUI(data);
    saveToLocalStorage(data);

  } catch (error) {
    console.error("Fel vid hämtning:", error);
  }
}

// ===== START =====
loadFromLocalStorage(); // visa sparat direkt
getPrice();             // hämta nytt direkt

// ===== LIVE UPPDATERING =====
setInterval(getPrice, 5000); // var 5 sek