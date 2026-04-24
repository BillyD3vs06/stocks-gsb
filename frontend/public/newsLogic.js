// Lägg till nyhet
function newsButton() {
    const titleInput = document.getElementById("type");
    const descInput = document.getElementById("des_news");

    if (!titleInput || !descInput) return;

    const title = titleInput.value;
    const desc = descInput.value;

    if (title === "" || desc === "") {
        alert("Fyll i alla fält!");
        return;
    }

    const newsItem = {
        title: title,
        description: desc
    };

    let newsList = JSON.parse(localStorage.getItem("news")) || [];
    newsList.push(newsItem);

    localStorage.setItem("news", JSON.stringify(newsList));

    // Rensa fält
    titleInput.value = "";
    descInput.value = "";

    alert("Nyhet sparad!");
}


// Visa nyheter
function loadNews() {
    const news_holder = document.getElementById("news_holder");

    // Om vi inte är på rätt sida → gör inget
    if (!news_holder) return;

    const newsList = JSON.parse(localStorage.getItem("news")) || [];

    news_holder.innerHTML = "";

    newsList.forEach((item, index) => {
        const mainDiv = document.createElement("div");
        mainDiv.className = "news";

        const title = document.createElement("h3");
        title.className = "newsTitle";
        title.textContent = item.title;

        const desc = document.createElement("p");
        desc.className = "newsDes";
        desc.textContent = item.description;

        // 🔴 TA BORT KNAPP
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Ta bort";
        deleteBtn.onclick = function () {
            deleteNews(index);
        };

        mainDiv.appendChild(title);
        mainDiv.appendChild(desc);
        mainDiv.appendChild(deleteBtn);

        news_holder.appendChild(mainDiv);
    });
}


// Ta bort nyhet
function deleteNews(index) {
    let newsList = JSON.parse(localStorage.getItem("news")) || [];

    newsList.splice(index, 1);

    localStorage.setItem("news", JSON.stringify(newsList));

    loadNews();
}


// Kör när sidan laddas
document.addEventListener("DOMContentLoaded", function () {
    loadNews();
});