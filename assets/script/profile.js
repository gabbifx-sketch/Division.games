(() => {
const $ = id => document.getElementById(id);
const client = window.divisionSupabase;
const form = $("profile-form");
const message = $("profile-message");
let currentUser = null;
let currentAvatarUrl = null;

function showMessage(text, type = "") {
 message.textContent = text;
 message.className = type;
}
function initials(first, last, username, email) {
 const a = (first || "").trim().charAt(0);
 const b = (last || "").trim().charAt(0);
 if (a && b) return (a + b).toUpperCase();
 if (a) return a.toUpperCase();
 if (username) return username.trim().slice(0, 2).toUpperCase();
 return (email || "D").trim().slice(0, 1).toUpperCase();
}
function renderAvatar(url, first, last, username) {
 const avatar = $("profile-avatar");
 avatar.replaceChildren();
 if (url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Your profile picture";
  avatar.append(img);
  $("remove-avatar").hidden = false;
 } else {
  avatar.textContent = initials(first, last, username, currentUser?.email);
  $("remove-avatar").hidden = true;
 }
}
async function loadPlayerGameLists() {
 const render = (el, rows, empty) => {
  el.replaceChildren();
  const list = (rows || []).filter(x => x.games);
  if (!list.length) {
   const p = document.createElement("p");
   p.className = "library-empty";
   p.textContent = empty;
   el.append(p);
   return;
  }
  list.forEach(row => {
   const g = row.games, a = document.createElement("a");
   a.className = "player-game-card";
   a.href = "./play.html?game=" + encodeURIComponent(g.title);
   const img = document.createElement("img");
   img.src = g.thumbnail_url || "";
   img.alt = g.title;
   img.loading = "lazy";
   const span = document.createElement("span");
   span.textContent = g.title;
   a.append(img, span);
   el.append(a);
  });
 };
 const [fav, recent] = await Promise.all([
  client.from("favorites").select("created_at,games(id,title,slug,thumbnail_url)").eq("user_id", currentUser.id).order("created_at", {ascending:false}),
  client.from("recently_played").select("last_played_at,games(id,title,slug,thumbnail_url)").eq("user_id", currentUser.id).order("last_played_at", {ascending:false}).limit(12)
 ]);
 render($("favorite-games"), fav.data, fav.error ? "Could not load favourites." : "No favourites yet. Save games from their play pages.");
 render($("recent-games"), recent.data, recent.error ? "Could not load recent games." : "Games you play will appear here.");
}
async function loadProfile() {
 if (!client) {
  showMessage("The account connection did not load. Refresh the page.", "error");
  $("save-profile").disabled = true;
  return;
 }
 const {data:{session}, error:sessionError} = await client.auth.getSession();
 if (sessionError || !session?.user) {
  window.location.replace("./auth.html");
  return;
 }
 currentUser = session.user;
 $("profile-email").textContent = currentUser.email || "Email unavailable";
 const {data:profile, error} = await client.from("profiles")
  .select("username,bio,status,avatar_url,first_name,last_name,created_at")
  .eq("user_id", currentUser.id).single();
 if (error || !profile) {
  showMessage(error?.message || "Could not load your player profile.", "error");
  return;
 }
 currentAvatarUrl = profile.avatar_url || null;
 $("profile-username").textContent = profile.username;
 $("profile-status").textContent = profile.status || "active";
 $("first-name").value = profile.first_name || "";
 $("last-name").value = profile.last_name || "";
 $("username").value = profile.username || "";
 $("bio").value = profile.bio || "";
 renderAvatar(currentAvatarUrl, profile.first_name, profile.last_name, profile.username);
 await loadPlayerGameLists();
}
$("upload-avatar").addEventListener("click", async () => {
 if (!currentUser) return;
 const file = $("avatar-file").files[0];
 if (!file) { showMessage("Choose a picture first.", "error"); return; }
 if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
  showMessage("Choose a JPG, PNG or WebP image.", "error"); return;
 }
 if (file.size > 5 * 1024 * 1024) { showMessage("That image is larger than 5 MB.", "error"); return; }
 const button = $("upload-avatar");
 button.disabled = true; button.textContent = "Uploading...";
 showMessage("");
 const {data:uploaded, error:uploadError} = await client.storage
  .from("division-avatars")
  .upload(currentUser.id + "/avatar", file, {upsert:true, contentType:file.type, cacheControl:"3600"});
 if (uploadError) {
  button.disabled = false; button.textContent = "Upload picture";
  showMessage(uploadError.message, "error"); return;
 }
 const {data:{publicUrl}} = client.storage.from("division-avatars").getPublicUrl(uploaded.path);
 const avatarUrl = publicUrl + "?v=" + Date.now();
 const {error:updateError} = await client.from("profiles")
  .update({avatar_url:avatarUrl}).eq("user_id", currentUser.id);
 button.disabled = false; button.textContent = "Upload picture";
 if (updateError) { showMessage(updateError.message, "error"); return; }
 currentAvatarUrl = avatarUrl;
 renderAvatar(currentAvatarUrl, $("first-name").value, $("last-name").value, $("username").value);
 $("avatar-file").value = "";
 showMessage("Profile picture updated.", "success");
});
$("remove-avatar").addEventListener("click", async () => {
 if (!currentUser || !currentAvatarUrl) return;
 const button = $("remove-avatar");
 button.disabled = true;
 const {error} = await client.from("profiles").update({avatar_url:null}).eq("user_id", currentUser.id);
 button.disabled = false;
 if (error) { showMessage(error.message, "error"); return; }
 currentAvatarUrl = null;
 renderAvatar(null, $("first-name").value, $("last-name").value, $("username").value);
 showMessage("Profile picture removed.", "success");
});
form.addEventListener("submit", async event => {
 event.preventDefault();
 if (!client || !currentUser) return;
 const first_name = $("first-name").value.trim();
 const last_name = $("last-name").value.trim();
 const username = $("username").value.trim();
 const bio = $("bio").value.trim();
 if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
  showMessage("Use 3–20 letters, numbers or underscores for your username.", "error"); return;
 }
 const button = $("save-profile");
 button.disabled = true; button.textContent = "Saving..."; showMessage("");
 const {data, error} = await client.from("profiles")
  .update({first_name, last_name, username, bio})
  .eq("user_id", currentUser.id)
  .select("first_name,last_name,username,bio").single();
 button.disabled = false; button.textContent = "Save changes";
 if (error) {
  showMessage(error.code === "23505" ? "That username is already taken." : error.message, "error"); return;
 }
 $("profile-username").textContent = data.username;
 renderAvatar(currentAvatarUrl, data.first_name, data.last_name, data.username);
 showMessage("Profile updated successfully.", "success");
});
$("profile-signout").addEventListener("click", async () => {
 const button = $("profile-signout"); button.disabled = true;
 const {error} = await client.auth.signOut();
 if (error) { button.disabled = false; showMessage(error.message, "error"); return; }
 window.location.replace("./auth.html");
});
loadProfile();
})();