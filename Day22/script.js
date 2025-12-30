const API_KEY = "21c1eb90312941b0ae8978b33fac17d4"; // Replace NewsAPI.org key
const newsContainer = document.getElementById("newsContainer");

//const themeToggle = document.getElementById("themeToggle");

let currentTab = "in"; //
let currentCategory = "";
let refreshInterval = 10 * 60 * 1000; //10minutes refresh

// Fetch current news

async function fetchNews() {
  let url = `https://newsapi.org/v2/top-headlines?country=${currentTab}&apiKey=${API_KEY}`;

  if (currentCategory) {
    url += `&category=${currentCategory}`;
  }

  const search = document.getElementById("searchInput").value.trim();
  if (search) {
    url += `&q=${encodeURIComponent(search)}`;
  }

  newsContainer.innerHTML = "<p>Loading current news...</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    newsContainer.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news available right now.</p>";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
        <div class="news-content">
          <h3>${article.title}</h3>
          <p>${article.description || ""}</p>
          <a href="${article.url}" target="_blank">Read More →</a>
        </div>
      `;
      newsContainer.appendChild(card);
    });
  } catch (error) {
    newsContainer.innerHTML = "<p>Error loading news.</p>";
    console.error(error);
  }
}

// Handle search
function handleSearch() {
  fetchNews();
}

// Handle category 
function handleCategory(category) {
  currentCategory = category;
  document.getElementById("searchInput").value = "";
  fetchNews();
}

//  Indianews and Globalnews
function switchTab(tab) {
  currentTab = tab === "global" ? "" : "in"; 
  currentCategory = "";
  document.getElementById("searchInput").value = "";
  fetchNews();
}

// Dark / Light mode
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");
const text = themeToggle.querySelector("span");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");

  icon.setAttribute("data-lucide", isDark ? "sun" : "moon");
  text.textContent = isDark ? "Light Mode" : "Dark Mode";

  lucide.createIcons(); // rerendenring process
});



// starting process
fetchNews();

// Auto-refresh every 10 minutes
setInterval(fetchNews, refreshInterval);



