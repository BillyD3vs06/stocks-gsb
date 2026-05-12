function getCurrentNewsUser() {
    const newsPage = document.getElementById("news_page");
    const newsFormPage = document.getElementById("news_form_page");
    const sourceElement = newsPage || newsFormPage;

    return {
        id: sourceElement?.dataset.currentUserId || "",
        username: sourceElement?.dataset.currentUsername || ""
    };
}

function getNewsList() {
    return JSON.parse(localStorage.getItem("news")) || [];
}

function saveNewsList(newsList) {
    localStorage.setItem("news", JSON.stringify(newsList));
}

let pendingDeleteIndex = null;

function getDeletePopupElements() {
    return {
        overlay: document.getElementById("delete_popup_overlay"),
        confirmButton: document.getElementById("delete_popup_confirm"),
        cancelButton: document.getElementById("delete_popup_cancel")
    };
}

function openDeletePopup(index) {
    const { overlay } = getDeletePopupElements();

    if (!overlay) {
        return;
    }

    pendingDeleteIndex = index;
    overlay.classList.remove("hidden");
}

function closeDeletePopup() {
    const { overlay } = getDeletePopupElements();

    if (!overlay) {
        return;
    }

    pendingDeleteIndex = null;
    overlay.classList.add("hidden");
}

function newsButton() {
    const titleInput = document.getElementById("type");
    const descInput = document.getElementById("des_news");
    const currentUser = getCurrentNewsUser();

    if (!titleInput || !descInput) {
        return;
    }

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (currentUser.id === "" || currentUser.username === "") {
        alert("You must be logged in to post a news article!");
        return;
    }

    if (title === "" || desc === "") {
        alert("Please fill in all fields!");
        return;
    }

    const newsItem = {
        title,
        description: desc,
        authorId: currentUser.id,
        authorUsername: currentUser.username
    };

    const newsList = getNewsList();
    newsList.push(newsItem);
    saveNewsList(newsList);

    titleInput.value = "";
    descInput.value = "";

    alert("News saved.!");
    window.location.href = "nyheter.php";
}

function loadNews() {
    const newsHolder = document.getElementById("news_holder");

    if (!newsHolder) {
        return;
    }

    const currentUser = getCurrentNewsUser();
    const newsList = getNewsList();

    newsHolder.innerHTML = "";

    if (newsList.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "news_empty";
        emptyMessage.textContent = "No news has been posted yet.";
        newsHolder.appendChild(emptyMessage);
        return;
    }

    newsList.forEach((item, index) => {
        const mainDiv = document.createElement("div");
        mainDiv.className = "news";

        const author = document.createElement("p");
        author.className = "newsAuthor";
        author.textContent = item.authorUsername
            ? `Posted by: ${item.authorUsername}`
            : "Posted by: Unknown user";

        const title = document.createElement("h3");
        title.className = "newsTitle";
        title.textContent = item.title;

        const desc = document.createElement("p");
        desc.className = "newsDes";
        desc.textContent = item.description;

        mainDiv.appendChild(author);
        mainDiv.appendChild(title);
        mainDiv.appendChild(desc);

        if (String(item.authorId || "") === String(currentUser.id) && currentUser.id !== "") {
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "newsDelete";
            deleteBtn.textContent = "Delete.";
            deleteBtn.addEventListener("click", () => {
                openDeletePopup(index);
            });
            mainDiv.appendChild(deleteBtn);
        }

        newsHolder.appendChild(mainDiv);
    });
}

function deleteNews(index) {
    const currentUser = getCurrentNewsUser();
    const newsList = getNewsList();
    const selectedNews = newsList[index];

    if (!selectedNews) {
        return;
    }

    if (String(selectedNews.authorId || "") !== String(currentUser.id)) {
        alert("You can only delete your own news articles.");
        return;
    }

    newsList.splice(index, 1);
    saveNewsList(newsList);
    loadNews();
}

document.addEventListener("DOMContentLoaded", function () {
    const postButton = document.getElementById("post_news_button");
    const { overlay, confirmButton, cancelButton } = getDeletePopupElements();

    if (postButton) {
        postButton.addEventListener("click", newsButton);
    }

    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            if (pendingDeleteIndex === null) {
                closeDeletePopup();
                return;
            }

            deleteNews(pendingDeleteIndex);
            closeDeletePopup();
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener("click", closeDeletePopup);
    }

    if (overlay) {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                closeDeletePopup();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDeletePopup();
        }
    });

    loadNews();
});
