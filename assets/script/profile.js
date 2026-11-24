(() => {
const $ = id => document.getElementById(id);
const client = window.divisionSupabase;
const form = $("profile-form");
const message = $("profile-message");
let currentUser = null;

function showMessage(text, type = "") {
 message.textContent = text;
 message.className = type;
}
function initials(name) {
 return (name || "D").trim().slice(0, 1).toUpperCase() || "D";
}
async function loadProfile() {
 if (!client) {
  showMessage("The account connection did not load. Refresh the page.", "error");
  form.querySelector("button").disabled = true;
  return;
 }
 const { data: { session }, error: sessionError } = await client.auth.getSession();
 if (sessionError || !session?.user) {
  window.location.replace("./auth.html");
  return;
 }
 currentUser = session.user;
 $("profile-email").textContent = currentUser.email || "Email unavailable";
 const { data: profile, error } = await client.from("profiles")
  .select("username,bio,status,avatar_url,created_at")
  .eq("user_id", currentUser.id)
  .single();
 if (error || !profile) {
  showMessage(error?.message || "Could not load your player profile.", "error");
  return;
 }
 $("profile-username").textContent = profile.username;
 $("profile-avatar").textContent = initials(profile.username);
 $("profile-status").textContent = profile.status || "active";
 $("username").value = profile.username || "";
 $("bio").value = profile.bio || "";
}
form.addEventListener("submit", async event => {
 event.preventDefault();
 if (!client || !currentUser) return;
 const username = $("username").value.trim();
 const bio = $("bio").value.trim();
 if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
  showMessage("Use 3–20 letters, numbers or underscores for your username.", "error");
  return;
 }
 const button = $("save-profile");
 button.disabled = true;
 button.textContent = "Saving...";
 showMessage("");
 const { data, error } = await client.from("profiles")
  .update({ username, bio })
  .eq("user_id", currentUser.id)
  .select("username,bio")
  .single();
 button.disabled = false;
 button.textContent = "Save changes";
 if (error) {
  const detail = error.code === "23505" ? "That username is already taken." : error.message;
  showMessage(detail, "error");
  return;
 }
 $("profile-username").textContent = data.username;
 $("profile-avatar").textContent = initials(data.username);
 showMessage("Profile updated successfully.", "success");
});
$("profile-signout").addEventListener("click", async () => {
 const button = $("profile-signout");
 button.disabled = true;
 const { error } = await client.auth.signOut();
 if (error) {
  button.disabled = false;
  showMessage(error.message, "error");
  return;
 }
 window.location.replace("./auth.html");
});
loadProfile();
})();