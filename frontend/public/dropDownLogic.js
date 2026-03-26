

const value = document.getElementById("value");
const category = document.getElementById("category");

const options = {
    gold: ["Silver", "Bronze", "Oil"],
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
