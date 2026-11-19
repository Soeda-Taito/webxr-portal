// ゲーム情報はこの配列に追加できます。
// path はサイト内のゲームなら相対パス、外部ゲームなら https:// から始まるURLを指定します。
const games = [
  {
    id: "sample",
    title: "NEBULA SPACE",
    description: "宇宙空間を自由に眺めるWebXRデモ。",
    genre: "exploration",
    genreName: "EXPLORATION",
    icon: "🌌",
    path: "./games/sample/index.html"
  }
];

const grid = document.getElementById("game-grid");
const search = document.getElementById("search");
const count = document.getElementById("game-count");
const player = document.getElementById("player");
const frame = document.getElementById("game-frame");
const playerTitle = document.getElementById("player-title");

let currentFilter = "all";

function renderGames() {
  const keyword = search.value.trim().toLowerCase();

  const filtered = games.filter(game => {
    const matchesFilter = currentFilter === "all" || game.genre === currentFilter;
    const matchesSearch = `${game.title} ${game.description} ${game.genreName}`
      .toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch;
  });

  count.textContent = `${filtered.length} GAMES`;
  grid.innerHTML = filtered.map(game => `
    <article class="game-card">
      <div class="game-art" aria-hidden="true">${game.icon}</div>
      <div class="game-info">
        <h3>${escapeHTML(game.title)}</h3>
        <p>${escapeHTML(game.description)}</p>
        <span class="tag">${escapeHTML(game.genreName)}</span>
        <button class="play-button" type="button" data-game="${escapeHTML(game.id)}">
          ▶ PLAY GAME
        </button>
      </div>
    </article>
  `).join("");

  if (filtered.length === 0) {
    grid.innerHTML = "<p>ゲームが見つかりませんでした。</p>";
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function openGame(id) {
  const game = games.find(item => item.id === id);
  if (!game) return;

  playerTitle.textContent = game.title;
  frame.src = game.path;
  player.classList.add("open");
  player.setAttribute("aria-hidden", "false");
}

function closeGame() {
  player.classList.remove("open");
  player.setAttribute("aria-hidden", "true");
  frame.src = "about:blank";
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-game]");
  if (button) openGame(button.dataset.game);
});

search.addEventListener("input", renderGames);

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderGames();
  });
});

document.getElementById("close-player").addEventListener("click", closeGame);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeGame();
});

renderGames();
