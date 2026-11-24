(() => {
const client = window.divisionSupabase;
const params = new URLSearchParams(window.location.search);
const playerId = params.get("id");
const state = document.getElementById("public-profile-state");
const content = document.getElementById("public-profile-content");
const favoritesGrid = document.getElementById("public-favorite-games");

function initials(profile) {
 const first = (profile.first_name || "").trim();
 const last = (profile.last_name || "").trim();
 return ((first[0] || "") + (last[0] || "")).toUpperCase()
  || (profile.username || "DP").slice(0, 2).toUpperCase();
}

async function loadPlayer() {
 if (!client || !playerId) {
  state.textContent = "This player profile could not be found.";
  return;
 }
 const { data: profile, error } = await client.from("profiles")
  .select("user_id,username,first_name,last_name,avatar_url,bio,created_at,status")
  .eq("user_id", playerId).eq("status", "active").maybeSingle();
 if (error || !profile) {
  state.textContent = "This player profile is unavailable.";
  return;
 }
 document.title = profile.username + " - DIVISION Player";
 state.hidden = true;
 content.hidden = false;
 const avatar = document.getElementById("public-avatar");
 if (profile.avatar_url) {
  const image = document.createElement("img");
  image.src = profile.avatar_url;
  image.alt = "Profile picture";
  avatar.append(image);
 } else {
  avatar.textContent = initials(profile);
 }
 const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim();
 document.getElementById("public-name").textContent = fullName || profile.username;
 document.getElementById("public-username").textContent = "@" + profile.username;
 document.getElementById("public-bio").textContent = profile.bio || "This player hasn't added a bio yet.";
 document.getElementById("joined-date").textContent = "Player since " + new Date(profile.created_at).toLocaleDateString(undefined, {month:"long",year:"numeric"});

 const { data: rows, error: favoritesError } = await client.from("favorites")
  .select("created_at,games(id,title,thumbnail_url)")
  .eq("user_id", profile.user_id).order("created_at", {ascending:false});
 favoritesGrid.replaceChildren();
 if (favoritesError || !rows?.length) {
  const empty = document.createElement("p");
  empty.className = "library-empty";
  empty.textContent = favoritesError ? "Favourite games couldn't be loaded." : "No favourite games yet.";
  favoritesGrid.append(empty);
  return;
 }
 rows.filter(row => row.games).forEach(row => {
  const game = row.games;
  const link = document.createElement("a");
  link.className = "player-game-card";
  link.href = "./play.html?game=" + encodeURIComponent(game.title);
  const image = document.createElement("img");
  image.src = game.thumbnail_url || "";
  image.alt = game.title;
  image.loading = "lazy";
  const title = document.createElement("span");
  title.textContent = game.title;
  link.append(image, title);
  favoritesGrid.append(link);
 });
}
loadPlayer();
})();