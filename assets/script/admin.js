(() => {
"use strict";
const supabase = window.divisionSupabase;
const $ = (id) => document.getElementById(id);
const loading = $("admin-loading");
const denied = $("admin-denied");
const app = $("admin-app");
const modal = $("game-modal");
let games = [];
let categories = [];

function message(text, isError = false) {
  $("admin-message").textContent = text;
  $("admin-message").style.color = isError ? "#ff9b83" : "#8ce0b4";
}
function showModal(show) { modal.hidden = !show; }
function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[char]);
}
function setStat(id, value) { $(id).textContent = Number(value || 0).toLocaleString(); }

async function boot() {
  if (!supabase) {
    loading.textContent = "Supabase could not load. Refresh the page and try again.";
    return;
  }
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    window.location.replace("./auth.html");
    return;
  }
  const { data: role, error: roleError } = await supabase
    .from("admin_roles").select("role").eq("user_id", user.id).maybeSingle();
  if (roleError || !role) {
    loading.hidden = true;
    denied.hidden = false;
    return;
  }
  const { data: profile } = await supabase.from("profiles")
    .select("status").eq("user_id", user.id).maybeSingle();
  if (!profile || profile.status !== "active") {
    loading.hidden = true;
    denied.hidden = false;
    return;
  }
  loading.hidden = true;
  app.hidden = false;
  await loadDashboard();
}

async function loadDashboard() {
  message("");
  const [gameResult, categoryResult] = await Promise.all([
    supabase.from("games").select("id,title,slug,thumbnail_url,is_published,play_count,category_id,description,instructions,controls,developer,embed_url,gameplay_video_url,tags,is_featured,is_popular,is_recommended,is_multiplayer").order("created_at", {ascending:false}),
    supabase.from("categories").select("id,name").order("name")
  ]);
  if (gameResult.error) {
    message("Could not load games: " + gameResult.error.message, true);
    return;
  }
  if (categoryResult.error) {
    message("Could not load categories: " + categoryResult.error.message, true);
    return;
  }
  games = gameResult.data || [];
  categories = categoryResult.data || [];
  const published = games.filter(g => g.is_published).length;
  setStat("stat-total", games.length);
  setStat("stat-published", published);
  setStat("stat-drafts", games.length - published);
  setStat("stat-plays", games.reduce((sum,g) => sum + Number(g.play_count || 0), 0));
  $("game-category").innerHTML = '<option value="">No category</option>' +
    categories.map(c => '<option value="' + escapeHtml(c.id) + '">' + escapeHtml(c.name) + '</option>').join("");
  renderGames();
}
function renderGames() {
  const term = $("game-search").value.trim().toLowerCase();
  const filtered = games.filter(g => (g.title + " " + g.slug).toLowerCase().includes(term));
  $("games-table").innerHTML = filtered.length ? filtered.map(g => {
    const thumb = g.thumbnail_url
      ? '<img src="' + escapeHtml(g.thumbnail_url) + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">'
      : '<span class="game-placeholder"></span>';
    return '<tr><td><div class="game-cell">' + thumb + '<div><strong>' + escapeHtml(g.title) + '</strong><small>/' + escapeHtml(g.slug) + '</small></div></div></td>' +
      '<td><span class="status ' + (g.is_published ? 'live' : '') + '">' + (g.is_published ? 'Published' : 'Draft') + '</span></td>' +
      '<td>' + Number(g.play_count || 0).toLocaleString() + '</td>' +
      '<td><div class="row-actions"><button type="button" data-edit="' + escapeHtml(g.id) + '">Edit</button><button type="button" data-toggle="' + escapeHtml(g.id) + '">' + (g.is_published ? 'Unpublish' : 'Publish') + '</button></div></td></tr>';
  }).join("") : '<tr><td colspan="4">No games match that search.</td></tr>';
}
function clearForm() {
  $("game-form").reset();
  $("game-id").value = "";
  $("modal-title").textContent = "Add a game";
  $("game-published").checked = false;
}
function editGame(game) {
  clearForm();
  $("modal-title").textContent = "Edit game";
  $("game-id").value = game.id;
  $("game-title").value = game.title || "";
  $("game-slug").value = game.slug || "";
  $("game-embed").value = game.embed_url || "";
  $("game-thumbnail").value = game.thumbnail_url || "";
  $("game-category").value = game.category_id || "";
  $("game-description").value = game.description || "";
  $("game-instructions").value = game.instructions || "";
  $("game-controls").value = game.controls || "";
  $("game-developer").value = game.developer || "";
  $("game-video").value = game.gameplay_video_url || "";
  $("game-tags").value = Array.isArray(game.tags) ? game.tags.join(", ") : "";
  $("game-featured").checked = !!game.is_featured;
  $("game-popular").checked = !!game.is_popular;
  $("game-recommended").checked = !!game.is_recommended;
  $("game-multiplayer").checked = !!game.is_multiplayer;
  $("game-published").checked = !!game.is_published;
  showModal(true);
}
function formPayload() {
  return {
    title: $("game-title").value.trim(),
    slug: $("game-slug").value.trim().toLowerCase(),
    embed_url: $("game-embed").value.trim(),
    thumbnail_url: $("game-thumbnail").value.trim(),
    category_id: $("game-category").value || null,
    description: $("game-description").value.trim(),
    instructions: $("game-instructions").value.trim(),
    controls: $("game-controls").value.trim(),
    developer: $("game-developer").value.trim(),
    gameplay_video_url: $("game-video").value.trim() || null,
    tags: $("game-tags").value.split(",").map(t => t.trim()).filter(Boolean),
    is_featured: $("game-featured").checked,
    is_popular: $("game-popular").checked,
    is_recommended: $("game-recommended").checked,
    is_multiplayer: $("game-multiplayer").checked,
    is_published: $("game-published").checked
  };
}
async function saveGame(event) {
  event.preventDefault();
  const id = $("game-id").value;
  const payload = formPayload();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    message("Slug must use lowercase letters, numbers and hyphens.", true);
    return;
  }
  const button = $("save-game");
  button.disabled = true;
  button.textContent = "Saving…";
  const result = id
    ? await supabase.from("games").update(payload).eq("id", id)
    : await supabase.from("games").insert(payload);
  button.disabled = false;
  button.textContent = "Save game";
  if (result.error) {
    message("Save failed: " + result.error.message, true);
    return;
  }
  showModal(false);
  message(id ? "Game updated." : "Game added.");
  await loadDashboard();
}
async function togglePublished(id) {
  const game = games.find(g => g.id === id);
  if (!game) return;
  const next = !game.is_published;
  const { error } = await supabase.from("games").update({is_published:next}).eq("id",id);
  if (error) {
    message("Could not change publish status: " + error.message, true);
    return;
  }
  message(game.title + (next ? " is now published." : " is now unpublished."));
  await loadDashboard();
}

$("new-game-button").addEventListener("click", () => {
  clearForm();
  showModal(true);
});
$("game-title").addEventListener("input", () => {
  if (!$("game-id").value) $("game-slug").value = slugify($("game-title").value);
});
$("game-form").addEventListener("submit", saveGame);
$("game-search").addEventListener("input", renderGames);
$("games-table").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  const toggleButton = event.target.closest("[data-toggle]");
  if (editButton) {
    const game = games.find(g => g.id === editButton.dataset.edit);
    if (game) editGame(game);
  }
  if (toggleButton) togglePublished(toggleButton.dataset.toggle);
});
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", () => showModal(false)));
$("admin-signout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.replace("./auth.html");
});
boot();
})();