// =========================================
// DIVISION SUPABASE CLIENT
// The publishable key is designed for browser use.
// Database access is protected by Supabase Row Level Security.
// NEVER place a service_role or secret key in this file.
// =========================================

(function () {
    const SUPABASE_URL = "https://rrsioshqaccepgsehliv.supabase.co";
    const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_sU7jiRRisxOfeI3tvurZyg_E6SUnl-F";

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        console.error("DIVISION: Supabase library did not load.");
        window.divisionBackendReady = Promise.resolve({
            connected: false,
            error: "Supabase library did not load."
        });
        return;
    }

    window.divisionSupabase = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    // A small read-only check confirms that the browser can reach
    // the DIVISION database. It does not change or insert any data.
    window.divisionBackendReady = window.divisionSupabase
        .from("categories")
        .select("id")
        .limit(1)
        .then(({ error }) => {
            if (error) {
                console.error("DIVISION: Supabase connection check failed:", error.message);
                return { connected: false, error: error.message };
            }

            console.info("DIVISION: Supabase connected successfully.");
            return { connected: true, error: null };
        });
})();
