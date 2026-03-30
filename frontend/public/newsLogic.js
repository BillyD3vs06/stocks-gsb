
const news_holder = document.getElementById("news_holder");

let newsIdentificator = 1;

function newsButton() {

    // Add news
    const mainDiv = document.createElement("div");
    mainDiv.id = `news${newsIdentificator}`;
    mainDiv.className = "news";

    // Adds picture
    const picture = document.createElement("div");
    picture.id = `picture${newsIdentificator}`;
    picture.className = "newsImage";
    picture.innerHTML = "Picture";

    // Adds title
    const title = document.createElement("h3");
    title.id = `new_title${newsIdentificator}`;
    title.className = "newsTitle";
    title.innerHTML = "News";

    // Adds description
    const news_des = document.createElement("p");
    news_des.id = `news_des${newsIdentificator}`;
    news_des.className = "newsDes";
    news_des.innerHTML = "News description";

    // Adds in mainDiv
    mainDiv.appendChild(picture);
    mainDiv.appendChild(title);
    mainDiv.appendChild(news_des);

    // Adds in news_holder
    news_holder.appendChild(mainDiv);

    newsIdentificator++;
}

