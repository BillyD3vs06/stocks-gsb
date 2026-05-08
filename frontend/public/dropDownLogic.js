

const value = document.getElementById("value");
const category = document.getElementById("category");

const options = {
    commodities: ["Silver", "Bronze", "Oil","Gold"],
    stock: ["Apple", "Tesla", "Nvidia"],
    crypto: ["Bitcoin", "Ethereum", "Solana"]
}

category.addEventListener("change", function() {
    const selected = category.value;

    value.innerHTML = '<option value="">Choose a value</option>';

    // Controls if you have choosed an option in both dropdowns

    if (selected && options[selected]) {
        options[selected].forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            value.appendChild(option);
        });
    }


});
const symbolMap = {
    Silver: "SLV",
    Bronze: "HG=F",
    Oil: "USO",
    Gold: "GLD",
    Apple: "AAPL",
    Tesla: "TSLA",
    Nvidia: "NVDA",
    Bitcoin: "BINANCE:BTCUSDT",
    Ethereum: "BINANCE:ETHUSDT",
    Solana: "BINANCE:SOLUSDT"
  };
  
  value.addEventListener("change", function () {
    const selectedValue = value.value;
  
    if (symbolMap[selectedValue]) {
      SYMBOL = symbolMap[selectedValue];
      getPrice(); // denna kommer nu använda rätt funktion ✅
    }
  });