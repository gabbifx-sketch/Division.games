// =========================================
// DIVISION GAME DATA
// =========================================

let displayHomeGames = [];


// =========================================
// ELEMENTS
// =========================================

const gameIcon = document.getElementById("game-icon-image");
const gamesContainer = document.querySelector(".display-games");

const searchInput = document.querySelector("#game-search");
const searchResults = document.querySelector("#search-results");
const searchClose = document.querySelector("#search-close");

const gameLaunchOverlay =
    document.querySelector("#gameLaunchOverlay");

const launchGameName =
    document.querySelector("#launchGameName");

const launchStatus =
    document.querySelector("#launchStatus");


// =========================================
// CREATE GAME CARD
// =========================================

function createGameCard(game) {

    const card = document.createElement("a");

    card.href = "#";
    card.className = "hero-game-card";
    card.title = game.title;

    card.innerHTML = `
        <img
            src="${game.img}"
            alt="${game.title}"
            loading="lazy"
        >

        <p>${game.title}</p>
    `;


    // =========================================
    // CLICK GAME
    // =========================================

    card.addEventListener("click", function(event) {

        event.preventDefault();

        launchGame(game);

    });


    return card;
}


// =========================================
// LAUNCH GAME
// =========================================

function launchGame(game) {

    // If launch overlay doesn't exist
    if (!gameLaunchOverlay) {

        window.location.href =
            "./play.html?game=" +
            encodeURIComponent(game.id);

        return;
    }


    // GAME ICON

    if (gameIcon) {

        gameIcon.innerHTML = `
            <img
                class="game-icon-img-work"
                src="${game.img}"
                alt="${game.title}"
            >
        `;

    }


    // GAME NAME

    if (launchGameName) {

        launchGameName.innerText =
            "Launching " + game.title;

    }


    // FIRST MESSAGE

    if (launchStatus) {

        launchStatus.innerText =
            "Getting everything ready...";

    }


    // SHOW OVERLAY

    gameLaunchOverlay.classList.add("active");


    // UPDATE MESSAGE

    setTimeout(function() {

        if (launchStatus) {

            launchStatus.innerText =
                "Starting game...";

        }

    }, 400);


    setTimeout(function() {

        if (launchStatus) {

            launchStatus.innerText =
                "Loading game...";

        }

    }, 700);


    // GO TO PLAY PAGE

    setTimeout(function() {

        window.location.href =
            "./play.html?game=" +
            encodeURIComponent(game.id);

    }, 1000);

}


// =========================================
// DISPLAY ALL GAMES
// =========================================

function displayAllGames() {

    if (!gamesContainer) {

        console.error(
            "Division: .display-games was not found."
        );

        return;
    }


    gamesContainer.innerHTML = "";


    displayHomeGames.forEach(function(game) {

        gamesContainer.appendChild(
            createGameCard(game)
        );

    });

}


// =========================================
// SEARCH GAMES
// =========================================

function searchGames() {

    if (!searchInput || !searchResults) {
        return;
    }

    const searchText =
        searchInput.value.trim().toLowerCase();

    searchResults.innerHTML = "";

    // Nothing typed
    if (searchText === "") {
        return;
    }

    // Find games by title, ID, OR category
    const results = displayHomeGames.filter(function (game) {

        const title =
            game.title.toLowerCase();

        const id =
            game.id.toLowerCase();

        const categories =
            game.categories || [];

        // Title match
        const titleMatch =
            title.includes(searchText);

        // ID match
        const idMatch =
            id.includes(searchText);

        // Category match
        const categoryMatch =
            categories.some(function (category) {

                return category
                    .toLowerCase()
                    .includes(searchText);

            });

        return (
            titleMatch ||
            idMatch ||
            categoryMatch
        );

    });


    // =========================================
    // NO RESULTS
    // =========================================

    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="no-results">

                <h3>No games found</h3>

                <p>
                    Try searching for another game
                    or category.
                </p>

            </div>
        `;

        return;
    }


    // =========================================
    // DISPLAY RESULTS
    // =========================================

    results.forEach(function (game) {

        const result =
            document.createElement("a");

        result.className =
            "search-result";

        result.href = "#";


        result.innerHTML = `

            <img
                src="${game.img}"
                alt="${game.title}"
            >

            <div class="search-result-info">

                <span class="search-result-title">
                    ${game.title}
                </span>

                <small class="search-result-category">
                    ${(game.categories || []).join(" • ")}
                </small>

            </div>

        `;


        // =========================================
        // CLICK SEARCH RESULT
        // =========================================

        result.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                launchGame(game);

            }
        );


        searchResults.appendChild(result);

    });

}

// =========================================
// SEARCH INPUT
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchGames
    );

}



const gameSearchLinks = document.querySelectorAll(".game-search-link");

gameSearchLinks.forEach(link => {
    link.addEventListener("click", () => {
        const gameName = link.dataset.game;

        gameSearch.value = gameName;

        gameSearch.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        setTimeout(() => {
            gameSearch.focus();
            gameSearch.setSelectionRange(
                gameSearch.value.length,
                gameSearch.value.length
            );
        }, 100);
    });
});

// =========================================
// ESC KEY
// =========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            window.location.hash = "";

            if (searchInput) {

                searchInput.value = "";

            }

            if (searchResults) {

                searchResults.innerHTML = "";

            }

            if (gameLaunchOverlay) {

                gameLaunchOverlay.classList.remove(
                    "active"
                );

            }

        }

    }
);
// =========================================
// CATEGORY → SEARCH
// =========================================

const categoryCards =
    document.querySelectorAll(".category-card");

const gameSearch =
    document.getElementById("game-search");

const searchOverlay =
    document.getElementById("search-overlay");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;

        // Open search overlay
        window.location.hash = "search-overlay";

        // Put category into search box
        gameSearch.value = category;

        // Run the existing search
        gameSearch.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        // Focus search box
        setTimeout(() => {
            gameSearch.focus();

            // Put cursor at the end
            gameSearch.setSelectionRange(
                gameSearch.value.length,
                gameSearch.value.length
            );

        }, 100);

    });

});

// =========================================
// START DIVISION HOMEd
// =========================================

async function loadPublishedGames() {
    if (!window.divisionSupabase) {
        console.error("DIVISION: Supabase is unavailable.");
        if (gamesContainer) gamesContainer.textContent = "Games are temporarily unavailable. Please refresh.";
        return;
    }
    try {
        const [gameResult, categoryResult] = await Promise.all([
            window.divisionSupabase.from("games")
                .select("id,title,slug,thumbnail_url,category_id,tags,is_published")
                .eq("is_published", true)
                .order("created_at", { ascending: false }),
            window.divisionSupabase.from("categories").select("id,name")
        ]);
        if (gameResult.error) throw gameResult.error;
        if (categoryResult.error) throw categoryResult.error;
        const categoryNames = new Map((categoryResult.data || []).map(item => [item.id, item.name]));
        displayHomeGames = (gameResult.data || []).map(row => ({
            title: row.title,
            id: row.title,
            slug: row.slug,
            img: row.thumbnail_url || "",
            categories: [
                ...(row.category_id && categoryNames.has(row.category_id) ? [categoryNames.get(row.category_id)] : []),
                ...(Array.isArray(row.tags) ? row.tags : [])
            ]
        }));
        displayAllGames();
    } catch (error) {
        console.error("DIVISION: Could not load published games:", error);
        if (gamesContainer) gamesContainer.textContent = "Could not load games. Please refresh the page.";
    }
}
loadPublishedGames();

console.log(
    "Division home system working"
);

const footerCategories = document.querySelectorAll(".footer-category");

footerCategories.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const category = link.dataset.category;

        // Open the existing search overlay
        window.location.hash = "search-overlay";

        // Put the category name into search
        gameSearch.value = category;

        // Trigger your existing search system
        gameSearch.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        // Focus search
        setTimeout(() => {
            gameSearch.focus();
            gameSearch.setSelectionRange(
                gameSearch.value.length,
                gameSearch.value.length
            );
        }, 100);
    });
});

// =========================================
// ACCOUNT AVATAR — homepage header
// =========================================

(function initializeDivisionAccountNav() {
    const accountLink = document.getElementById("division-account-link");
    const client = window.divisionSupabase;
    if (!accountLink || !client) return;

    function initialsFrom(profile, user) {
        const first = (profile?.first_name || user?.user_metadata?.first_name || "").trim();
        const last = (profile?.last_name || user?.user_metadata?.last_name || "").trim();
        if (first || last) {
            return ((first[0] || "") + (last[0] || "")).toUpperCase() || "?";
        }
        const username = (profile?.username || user?.user_metadata?.username || "").trim();
        if (username) return username.slice(0, 2).toUpperCase();
        const email = user?.email || "";
        return email ? email.slice(0, 2).toUpperCase() : "?";
    }

    async function updateAccountLink(user) {
        accountLink.replaceChildren();
        if (!user) {
            const fallback = document.createElement("span");
            fallback.className = "division-avatar-fallback";
            fallback.textContent = "?";
            accountLink.appendChild(fallback);
            accountLink.href = "./auth.html";
            accountLink.title = "Sign in or create an account";
            accountLink.setAttribute("aria-label", "Sign in or create an account");
            return;
        }

        accountLink.href = "./profile.html";
        accountLink.title = "Open your DIVISION player profile";
        accountLink.setAttribute("aria-label", "Open your DIVISION player profile");

        let profile = null;
        const { data } = await client.from("profiles")
            .select("first_name,last_name,username,avatar_url")
            .eq("user_id", user.id).maybeSingle();
        profile = data || null;

        if (profile?.avatar_url) {
            const avatar = document.createElement("img");
            avatar.className = "division-avatar-image";
            avatar.src = profile.avatar_url;
            avatar.alt = "";
            accountLink.appendChild(avatar);
        } else {
            const fallback = document.createElement("span");
            fallback.className = "division-avatar-fallback";
            fallback.textContent = initialsFrom(profile, user);
            accountLink.appendChild(fallback);
        }
    }

    client.auth.getSession().then(({ data, error }) => {
        if (error) {
            console.error("DIVISION: Could not read account session:", error.message);
            return;
        }
        updateAccountLink(data.session?.user || null);
    });

    client.auth.onAuthStateChange((_event, session) => {
        updateAccountLink(session?.user || null);
    });
})();

