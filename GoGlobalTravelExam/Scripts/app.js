let selectedRepo = null;

document.getElementById("searchBox").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchRepos();
    }
});
async function searchRepos() {
    const keyword = document.getElementById("searchBox").value;
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}`);
        const data = await response.json();
        renderResults(data.items);
    } catch (error) {
        console.error('Error:', error);
    }
}


function renderResults(repos) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    repos.forEach(repo => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                    <img src="${repo.owner.avatar_url}" alt="Avatar">
                    <h4>${repo.name}</h4>
                    <button onclick='bookmarkRepo(${JSON.stringify(repo)})'>Bookmark</button>
                    <button onclick='openPopup(${JSON.stringify(repo)})'>Send Email</button>
                `;
        resultsDiv.appendChild(card);
    });
}

async function bookmarkRepo(repo) {
    try {
        const response = await fetch("/Home/Bookmark", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(repo)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert("Repository bookmarked!");
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to bookmark repository");
    }
}




function openPopup(repo) {
    selectedRepo = repo;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("emailPopup").style.display = "block";
}

function closePopup() {
    selectedRepo = null;
    document.getElementById("overlay").style.display = "none";
    document.getElementById("emailPopup").style.display = "none";
}

function sendEmail() {
    const email = document.getElementById("emailAddress").value;
    fetch("/Home/SendEmail", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, repo: selectedRepo })
    })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            closePopup();
        });
}