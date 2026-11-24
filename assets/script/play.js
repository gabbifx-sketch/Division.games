// =========================================
// DIVISION PLAY SYSTEM
// =========================================


// =========================================
// FULLSCREEN
// =========================================

function openFullscreen() {

    const gameBox =
        document.getElementById("gameBox");

    const frame =
        document.getElementById("gameFrame");


    if (gameBox.requestFullscreen) {

        gameBox.requestFullscreen();

    }

    else if (gameBox.webkitRequestFullscreen) {

        gameBox.webkitRequestFullscreen();

    }

    else if (gameBox.msRequestFullscreen) {

        gameBox.msRequestFullscreen();

    }

    else if (frame.requestFullscreen) {

        frame.requestFullscreen();

    }

}

const gameIcon = document.getElementById("game-icon-image");

// =========================================
// GET GAME FROM URL
// =========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const game =
    params.get("game");


// =========================================
// ELEMENTS
// =========================================

const frame =
    document.getElementById("gameFrame");


const title =
    document.getElementById("title");


const gameDetails =
    document.getElementById(
        "game-detials-txt"
    );


const loadingScreen =
    document.getElementById(
        "loadingScreen"
    );


const loadingGameName =
    document.getElementById(
        "loadingGameName"
    );


const loadingStatus =
    document.getElementById(
        "loadingStatus"
    );


const gameDescription =
    document.getElementById(
        "game-description-text"
    );


const gameDeveloper = document.getElementById("game-developer");


const gameGenre =
    document.getElementById(
        "game-genre"
    );


const gameRelease =
    document.getElementById(
        "game-platform"
    );


const howToPlay =
    document.getElementById(
        "how-to-play-text"
    );

    const gameControls = document.querySelector('.game-controls-txt')

// =========================================
// GAME SYSTEM
// =========================================

if (game === "Ev.io") {

    title.innerText =
        "Ev.io";


    gameDetails.innerText =
        "Ev.io";


    frame.src =
        "https://nite.games/embed/cod-zombies";


    gameDescription.innerText =
        "Ev.io is a fast-paced multiplayer first-person shooter played directly in your browser. Battle other players across futuristic maps using different weapons and abilities.";


    gameDeveloper.innerText =
        "Addicting Games";
    gameGenre.innerText ="Multiplayer FPS";
    gamePlatform.innerText ="Web Browser";
           gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/ev-io.avif">
    `;
    howToPlay.innerText ="Enter a match, move around the map and fight other players. Use your weapons and abilities to defeat opponents and work toward the highest score.";
    document.title = "Ev.io - Division";
}else if (game === "1v1.lol") {

    title.innerText ="1v1.lol"; 
    gameDetails.innerText ="1v1.lol";
        gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/cover-1585728351086.avif">
    `;

    frame.src =
        "https://1v1-lol-online.github.io/file/";

    gameDescription.innerText ="Ev.io is a fast-paced multiplayer first-person shooter played directly in your browser. Battle other players across futuristic maps using different weapons and abilities.";
    gameDeveloper.innerText = "JustPlay.lol";
    gameDeveloper.href = 'https://www.justplay.lol/'
    gameGenre.innerText ="Multiplayer FPS";
    gamePlatform.innerText ="Web Browser";
    howToPlay.innerText = "Enter a match, move around the map and fight other players. Use your weapons and abilities to defeat opponents and work toward the highest score.";
    document.title = "Ev.io - Division";

}
else if (game === "Funny City") {
    title.innerText =
        "Funny City";
    gameDetails.innerText =
        "Funny City";

    frame.src =
        "https://kiz10.com/embed-play/funny-city-gopniks/?img=22782/1766118491_funny-city-gopniks.webp";

    gameDescription.innerText ="Ev.io is a fast-paced multiplayer first-person shooter played directly in your browser. Battle other players across futuristic maps using different weapons and abilities.";
    gameDeveloper.innerText = "Addicting Games";
    gameGenre.innerText ="Multiplayer FPS";
    gamePlatform.innerText ="Web Browser";
    howToPlay.innerText = "Enter a match, move around the map and fight other players. Use your weapons and abilities to defeat opponents and work toward the highest score.";
    document.title = "Ev.io - Division";

}
else if (game === "Shell Shockers") {
    title.innerText =
        "Shell Shockers";
    gameDetails.innerText =
        "Shell Shockers";

    frame.src =
        "https://shellshock.io/";

    gameDescription.innerText ="Ev.io is a fast-paced multiplayer first-person shooter played directly in your browser. Battle other players across futuristic maps using different weapons and abilities.";
    gameDeveloper.innerText = "Addicting Games";
    gameGenre.innerText ="Multiplayer FPS";
    gamePlatform.innerText ="Web Browser";
    howToPlay.innerText = "Enter a match, move around the map and fight other players. Use your weapons and abilities to defeat opponents and work toward the highest score.";
    document.title = "Ev.io - Division";
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/OSK.jpg">
    `;

}else if (game === "Among Us") {
    title.innerText =
        "Among Us";
    gameDetails.innerText =
        "Among Us";

    frame.src =
        "https://amongusplay.online/";

    gameDescription.innerText ="Among Us is a multiplayer social-deduction game where players work together as Crewmates to complete tasks around a spaceship or other locations while one or more Impostors secretly try to eliminate the crew and sabotage their objectives. Players must communicate, observe what happens around the map, report suspicious activity, and vote during meetings to determine who they believe is an Impostor. The game can be played with friends or other players online and supports different maps, customization options, game settings, and roles. Its simple gameplay, short rounds, and focus on teamwork, communication, and deception helped make Among Us one of the most recognizable multiplayer games of its generation.";
    gameDeveloper.innerText = "Innersloth";
    gameDeveloper.href = 'https://www.innersloth.com/'
    gameGenre.innerText ="Social Deduction / Multiplayer / Party";
    gameRelease.innerText ="2018";
    howToPlay.innerText = "As a Crewmate, complete your assigned tasks and pay attention to suspicious behavior while trying to identify the Impostor. If you find something suspicious, you can report it and discuss it with other players during a meeting. Players then vote on who they believe is responsible. As an Impostor, your objective is to secretly disrupt the crew and remove players while avoiding detection. The exact rules can change depending on the selected game settings and roles.";
    document.title = "Ev.io - Division";
    gameControls.innerHTML = `
    <p>
    • WASD / Arrow Keys — Move<br>
    • Mouse — Navigate menus / Interact<br>
    • E — Use / Interact<br>
    • Q — Eliminate (Impostor)<br>
    • R — Report<br>
    • Space — Use / Interact<br>
    • Tab — View map
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/OSK.jpg">
    `;

}
else if (game === "Ladderrex") {
    title.innerText =
        "Ladderrex";
    gameDetails.innerText ="Ladderrex";
    frame.src =
        "https://smashkarts.io/";

    gameDescription.innerText ="Ladderrex is a fast-paced racing game that combines running, resource management, and obstacle-course gameplay. Players race against a computer-controlled opponent while collecting logs scattered along the track. The collected wood is used to build ladders that help the player overcome raised platforms and other obstacles. Timing is important because building a ladder too early or using too much wood can waste valuable resources. The goal is to reach the finish while managing your logs efficiently and beating your opponent. The game was released in 2026 and is available as a browser game as well as a mobile app.";
    gameDeveloper.innerText = "Shanghai Yunding Tianxia Technology";
    gameGenre.innerText ="Racing / Casual / Hypercasual";
    gameRelease.innerText ="2026";
    howToPlay.innerText = "Run along the track, collect logs, and use them to build ladders when you reach obstacles. Release the build action at the right time to avoid wasting logs. Continue racing toward the finish while managing your resources and trying to stay ahead of the computer opponent.";
    document.title = "Ev.io - Division";
    gameControls.innerHTML =   `
    <p class="controls-txt">
   • Mouse / Click & Hold — Build ladder<br>
   • Release Mouse Button — Stop building<br>
   • Movement — Automatic running<br>
   • Mouse — Menus and interaction<br>
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/Ladderrex-512x384.jpg">
    `;
}
else if (game === "Fragen") {
    title.innerText =
        "Fragen";
    gameDetails.innerText =
        "Fragen";

    frame.src =
        "https://amongusplay.online/";

    gameDescription.innerText ="Fragen is a fast-paced multiplayer browser game focused on competitive arena gameplay. Players enter an online battlefield, move around the map, compete against opponents, and try to achieve the highest score. The game is designed to be easy to access through a web browser, making it suitable for quick gaming sessions without requiring a large installation. Its simple controls and multiplayer-focused design make it a straightforward game for players looking for a quick browser-based action experience.";
    gameDeveloper.innerText = "Unknown / Information not reliably verified";
    gameDeveloper.href = ''
    gameGenre.innerText ="Action / Multiplayer / Browser";
    gameRelease.innerText ="Unknown";
    howToPlay.innerText = "Enter the game, learn the arena, move around the map, compete against other players, and complete the objective of the current match. The exact gameplay and controls can vary depending on the version of Fragen being hosted.";
    document.title = "Playing Fragen - Division ";
    gameControls.innerHTML = `
    <p>
    • WASD — Move<br>
    • Mouse — Look / Aim<br>
    • Left Mouse Button — Primary action<br>
    • Space — Jump<br>
    • Shift — Sprint<br>
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/1750532663_fragen.jpg">
    `;

}
else if (game === "Vortex 9") {
    title.innerText =
        "Vortex 9 ";
    gameDetails.innerText =
        "Vortex 9";

    frame.src =
        "https://amongusplay.online/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/vortex-9_o.jpg">
    `;

}else if (game === "Stickman Daimond") {
    title.innerText =
        "Stickman Daimond: Steal the Daimond";
    gameDetails.innerText =
        "Stickman Daimond";

    frame.src =
        "https://html5.gamemonetize.co/xsnm9j5pt4edsiibqgn1vd8i0twqrclp/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/1759579759538-Deadshot IO.jpg">
    `;

}
else if (game === "DEADSHOT") {
    title.innerText =
        "DEADSHOT";
    gameDetails.innerText =
        "DEADSHOT";

    frame.src =
        "https://deadshot.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/1759579759538-Deadshot IO.jpg">
    `;

}
else if (game === "Vortex 9") {
    title.innerText =
        "Vortex 9";
    gameDetails.innerText =
        "Vortex 9";

    frame.src =
        "https://www.miniplay.com/embed/vortex-9";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/1759579759538-Deadshot IO.jpg">
    `;

}

else if (game === "Level Devil") {
    title.innerText =
        "Level Devil";
    gameDetails.innerText =
        "Level Devil";

    frame.src =
        "https://level-devil.org/play/index.html";

    gameDescription.innerText ="Level Devil is a challenging 2D platformer built around unexpected traps and surprise changes. The goal is simple: guide your character through each level and reach the exit door. The difficulty comes from hidden spikes, disappearing floors, moving platforms, changing walls, and other surprises that can catch you off guard. With more than 240 levels, the game relies heavily on timing, observation, and trial-and-error. It also features a local two-player mode for two people sharing the same computer.";
    gameDeveloper.innerText = "Unept";
    gameDeveloper.href = 'https://playleveldevil.com/'
    gameGenre.innerText ="Platformer / Puzzle / Casual / Action";
    gameRelease.innerText ="2024 (mobile), March 25, 2025 (Steam)";
    howToPlay.innerText = "Move through each level, avoid unexpected traps, jump across gaps, and reach the exit door. Pay attention to how the level changes as you move because seemingly safe platforms can suddenly become dangerous. Each failed attempt helps you learn the level and prepare for your next try.";
    document.title = "Leveil Devil";
    gameControls.innerHTML = `
    <p>
    • A / Left Arrow — Move left<br>
    • D / Right Arrow — Move right<br>
    • W / Up Arrow / Space — Jump<br>
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/level-devil.webp">
    `;

}

else if (game === "Venge") {
    title.innerText =
        "Venge";
    gameDetails.innerText =
        "Venge";

    frame.src =
        "https://venge.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/OIP-venge.webp">
    `;

}

else if (game === "Kour") {
    title.innerText =
        "Kour";
    gameDetails.innerText =
        "Kour";

    frame.src =
        "https://Kour.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/kour.io_.webp">
    `;

}

else if (game === "Krunker") {
    title.innerText =
        "Krunker";
    gameDetails.innerText =
        "Krunker";

    frame.src =
        "https://krunker.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/1200x744_krunker-io.jpg">
    `;

}

else if (game === "Kirka") {
    title.innerText =
        "Kirka";
    gameDetails.innerText =
        "Kirka";

    frame.src =
        "https://kirka.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/kirka-io.jpg">
    `;

}

else if (game === "SandStrike") {
    title.innerText =
        "SandStrike";
    gameDetails.innerText =
        "SandStrike";

    frame.src =
        "https://sandstrike.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/sandstrike-sandstrike-io.webp">
    `;

}


else if (game === "Voxiom") {
    title.innerText =
        "Voxiom";
    gameDetails.innerText =
        "Voxiom";

    frame.src =
        "https://voxiom.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/voxiom.webp">
    `;

}

else if (game === "BattleDudes") {
    title.innerText =
        "BattleDudes";
    gameDetails.innerText =
        "BattleDudes";

    frame.src =
        "https://battledudes.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/battledudesio.webp">
    `;

}

else if (game === "BuildRoyal") {
    title.innerText =
        "BuildRoyal";
    gameDetails.innerText =
        "BuildRoyal";

    frame.src =
        "https://buildroyal.io/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/build-royale-game-cover.webp">
    `;

}

else if (game === "ZombsRoyal") {
    title.innerText =
        "ZombsRoyal";
    gameDetails.innerText =
        "ZombsRoyal";

    frame.src =
        "https://zombsroyal/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/ZOMBS-ROYALE-Game.jpg">
    `;

}

else if (game === "NarrowOne") {
    title.innerText =
        "NarrowOne";
    gameDetails.innerText =
        "NarrowOne";

    frame.src =
        "https://narrow.one/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}
else if (game === "Davo") {
    title.innerText =
        "Davo Unblocked";
    gameDetails.innerText =
        "Davo Unblocked";

    frame.src =
        "https://d11jzht7mj96rr.cloudfront.net/games/2025/construct/302/davo/index-ts.html";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}else if (game === "Ragdoll Archers") {
    title.innerText =
        "Ragdoll Archers Unblocked";
    gameDetails.innerText =
        "Ragdoll Archers Unblocked";

    frame.src =
        "https://cdn.shawgames.com/ragdoll_archers/index.html";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}else if (game === "GTA Simulator") {
    title.innerText =
        "GTA Simulator";
    gameDetails.innerText =
        "GTA Simulator";

    frame.src =
        "https://cdn.shawgames.com/gta-simulator/index.html";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}else if (game === "Wheelie Bike") {
    title.innerText =
        "Wheelie Bike";
    gameDetails.innerText =
        "Wheelie Bike";

    frame.src =
        "https://cdn.shawgames.com/wheelie_bike/index.html";

    gameDescription.innerText ="Wheelie Bike is a simple motorcycle balancing game where players ride a bike while performing a wheelie for as long as possible. The main challenge is keeping the front wheel raised without losing balance or crashing. As you progress, you need to control the bike carefully, maintain the right angle, and react quickly to changes in the track. Its straightforward gameplay makes it easy to pick up but challenging to master.";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="16 Dec 2019";
    howToPlay.innerText = "Mouse Click or Tap · Navigate: Arrow Keys · Pause: Escape or P. Play instantly for free in your browser with no download or installation required. Works on Chromebook, laptop, and desktop.";
    document.title = "Wheelie Bike";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/Wheelie-Bike.jpg">
    `;
}else if (game === "Eagle Craft") {
    title.innerText =
        "Eagle Craft";
    gameDetails.innerText =
        "Eagle Craft";

    frame.src =
        "https://cdn.shawgames.com/eagle-craft/index.html";

    gameDescription.innerText ="Eaglercraft is a browser-based, open-source Minecraft project that brings a Minecraft-style experience to modern web browsers. The original project was created by LAX1DUDE, with the project beginning in late 2021 and its first stable build released in February 2022. Eaglercraft was designed around Minecraft 1.5.2 and later versions such as EaglercraftX 1.8.8 and 1.12.2 were developed by members of the community. Players can explore block-based worlds, gather resources, craft items, build structures, and play in single-player or multiplayer worlds.";
    gameDeveloper.innerText = "LAX1DUDE / Eaglercraft community";
    gameDeveloper.href = 'https://eaglercraft.com/',
    gameGenre.innerText ="Sandbox / Survival / Building / Multiplayer";
    gameRelease.innerText ="2022";
    howToPlay.innerText = "Explore the block-based world, collect resources, build structures, craft useful items, and explore different environments. Depending on the version, you can play single-player worlds or connect to multiplayer servers. EaglercraftX 1.8 also supports saving worlds through the browser, allowing players to continue their progress later.";
    document.title = "Eagle Craft";
    gameControls.innerHTML = `
    <p>
    • WASD — Move<br>
    • Mouse — Look around / interact<br>
    • Space — Jump<br>
    • Left Click — Mine / interact<br>
    • Right Click — Place / use<br>
    • E — Inventory<br>
    • 1–9 — Select hotbar item<br>
    • Esc — Pause / menu<br>
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/OIP (1).jpg">
    `;
}else if (game === "Car Parking") {
    title.innerText =
        "Car Parking";
    gameDetails.innerText =
        "Car Parking";

    frame.src =
        "https://st.8games.net/14/igra-parkovka-mashin-advans/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}else if (game === "Ladybug Pregnant Caring") {
    title.innerText =
        "Ladybug Pregnant Caring";
    gameDetails.innerText =
        "Ladybug Pregnant Caring";

    frame.src =
        "https://st.8games.net/9/igra-ukhod-za-beremennoj-ledi-bag/";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}else if (game === "Drift King") {
    title.innerText =
        "Drift King";
    gameDetails.innerText =
        "Drift King";

    frame.src =
        "https://cdn.shawgames.com/drift-king/index.html";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}else if (game === "Punchers") {
    title.innerText =
        "Punchers";
    gameDetails.innerText =
        "Punchers";

    frame.src =
        "https://games.crazygames.com/en_US/punchers/index.html?v=2.9";

    gameDescription.innerText ="";
    gameDeveloper.innerText = "";
    gameDeveloper.href = ''
    gameGenre.innerText ="";
    gameRelease.innerText ="";
    howToPlay.innerText = "";
    document.title = "";
    gameControls.innerHTML = `
    <p>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • <br>
    • 
    </p>
    `;
     gameIcon.innerHTML = `
        <img class="game-icon-img-work" src="assets/game-thumbnails/narrow-one-cover.avif">
    `;
}
// ========================================
// GAME NOT FOUND
// =========================================

else {

    title.innerText =
        "No game found";


    gameDetails.innerText =
        "No game found";


    gameDescription.innerText =
        "The game you are looking for could not be found.";


    gameDeveloper.innerText =
        "Unknown";


    gameGenre.innerText =
        "Unknown";


    gamePlatform.innerText =
        "Web Browser";


    howToPlay.innerText =
        "Return to the Division home page and choose another game.";


    document.title =
        "Game Not Found - Division";

}


// =========================================
// PREPARE LOADING SCREEN
// =========================================

if (
    game &&
    game !== ""
) {

    loadingGameName.innerText =
        "Preparing " + title.innerText;


    loadingStatus.innerText =
        "Loading game...";


    setTimeout(function() {

        loadingStatus.innerText =
            "Almost ready...";

    }, 700);


    setTimeout(function() {

        loadingStatus.innerText =
            "Starting game...";

    }, 1400);

}


// =========================================
// GAME LOADED
// =========================================

frame.addEventListener(
    "load",
    function() {

        loadingStatus.innerText =
            "Game ready!";


        setTimeout(function() {

            loadingScreen.style.opacity =
                "0";


            setTimeout(function() {

                loadingScreen.style.display =
                    "none";

            }, 350);

        }, 300);

    }
);


// =========================================
// CONSOLE
// =========================================

console.log(
    "Division play system working:",
    game
);

// =========================================
// GAMEPLAY VIDEO
// =========================================


// =========================================
// GAMEPLAY VIDEO
// =========================================

const gameplayVideos = {

    "Ev.io": "bZt0rTJ0l20ZknId",
    "1v1.lol": "",
    "Funny City": "",
    "Shell Shockers": "",
    "Among Us": "p0aHDT8wwrw",
    "Ladderrex": "",
    "Fragen": "",
    "Vortex 9": "",
    "DEADSHOT": "LnVUqMKH-2I",
    "Venge": "-zX_eySjcAU",
   "Kour": "lSkHX3W9WU4",
"Krunker": "4v8hrLzaqig",
"Kirka": "ThH3SSqzZZ8",
    "SandStrike": "dgJTYX46_fQ",
    "Voxiom": "",
    "BattleDudes": "",
    "BuildRoyal": "",
     "ZombsRoyal": "gYF2RYBVqVE",
    "NarrowOne": "oz8JC9YTK3s",
    "Davo": "",
    "Ragdoll Archers": "XvHEFGzq81YlTpwB",
    "Wheelie Bike": "JVqOCC7XURMIMmpV",
    "Eagle Craft": "XsuHOEFDWno",
    "Punchers": "UREBglHcbz0",
    "Level Devil": "9GCu5swRgKU",

};
const gameplaySection =
    document.querySelector(".gameplay-section");

const gameplayVideo =
    document.getElementById("gameplayVideo");

const gameplayTitle =
    document.getElementById("gameplayTitle");

function loadGameplayVideo(gameName) {

    const videoId = gameplayVideos[gameName];

    if (videoId && videoId.trim() !== "") {

        gameplaySection.style.display = "block";

        gameplayTitle.textContent =
            "Gameplay : " + gameName;

        gameplayVideo.src =
            "https://www.youtube-nocookie.com/embed/" +
            videoId;

    } else {

        gameplaySection.style.display = "none";

        gameplayVideo.removeAttribute("src");
    }
}

loadGameplayVideo(game);



// =========================================
// MORE GAMES LIKE THIS
// =========================================

const moreGamesGrid =
    document.getElementById("moreGamesGrid");


// GAME THUMBNAILS

const moreGameImages = {

    "Ev.io":
        "assets/game-thumbnails/ev-io.avif",

    "1v1.lol":
        "assets/game-thumbnails/cover-1585728351086.avif",

    "Funny City":
        "assets/game-thumbnails/OSK.jpg",

    "Shell Shockers":
        "assets/game-thumbnails/OSK.jpg",

    "Among Us":
        "assets/game-thumbnails/OSK.jpg",

    "Ladderrex":
        "assets/game-thumbnails/Ladderrex-512x384.jpg",

    "Fragen":
        "assets/game-thumbnails/1750532663_fragen.jpg",

    "Vortex 9":
        "assets/game-thumbnails/vortex-9_o.jpg",

    "DEADSHOT":
        "assets/game-thumbnails/1759579759538-Deadshot IO.jpg",

    "Venge":
        "assets/game-thumbnails/OIP-venge.webp",

    "Kour":
        "assets/game-thumbnails/kour.io_.webp",

    "Krunker":
        "assets/game-thumbnails/1200x744_krunker-io.jpg",

    "Kirka":
        "assets/game-thumbnails/kirka-io.jpg",

    "SandStrike":
        "assets/game-thumbnails/sandstrike-sandstrike-io.webp",

    "Voxiom":
        "assets/game-thumbnails/voxiom.webp",

    "BattleDudes":
        "assets/game-thumbnails/battledudesio.webp",

    "BuildRoyal":
        "assets/game-thumbnails/build-royale-game-cover.webp",

    "ZombsRoyal":
        "assets/game-thumbnails/ZOMBS-ROYALE-Game.jpg",

    "NarrowOne":
        "assets/game-thumbnails/narrow-one-cover.avif",

    "Davo":
        "assets/game-thumbnails/narrow-one-cover.avif",

    "Ragdoll Archers":
        "assets/game-thumbnails/narrow-one-cover.avif",

    "GTA Simulator":
        "assets/game-thumbnails/narrow-one-cover.avif",

    "Wheelie Bike":
        "assets/game-thumbnails/Wheelie-Bike.jpg"

};


// GAME GROUPS

const gameGroups = {

    "Racing": [
        "Ladderrex",
        "Wheelie Bike",
        "GTA Simulator"
    ],

    "FPS": [
        "Ev.io",
        "DEADSHOT",
        "Venge",
        "Kour",
        "Krunker",
        "Kirka",
        "SandStrike",
        "BattleDudes"
    ],

    "Battle Royale": [
        "ZombsRoyal",
        "BuildRoyal"
    ],

    "Action": [
        "1v1.lol",
        "Voxiom",
        "NarrowOne",
        "Ragdoll Archers"
    ],

    "Multiplayer": [
        "Among Us",
        "Fragen",
        "Vortex 9"
    ]

};


// WHICH GROUP EACH GAME BELONGS TO

const gameTypes = {

    "Ladderrex": "Racing",
    "Wheelie Bike": "Racing",
    "GTA Simulator": "Racing",

    "Ev.io": "FPS",
    "DEADSHOT": "FPS",
    "Venge": "FPS",
    "Kour": "FPS",
    "Krunker": "FPS",
    "Kirka": "FPS",
    "SandStrike": "FPS",
    "BattleDudes": "FPS",

    "ZombsRoyal": "Battle Royale",
    "BuildRoyal": "Battle Royale",

    "1v1.lol": "Action",
    "Voxiom": "Action",
    "NarrowOne": "Action",
    "Ragdoll Archers": "Action",

    "Among Us": "Multiplayer",
    "Fragen": "Multiplayer",
    "Vortex 9": "Multiplayer"
};


// LOAD RELATED GAMES

function loadMoreGames(gameName) {

    if (!moreGamesGrid) return;

    moreGamesGrid.innerHTML = "";

    const type = gameTypes[gameName];

    if (!type) return;

    const games =
        gameGroups[type]
        .filter(name => name !== gameName)
        .slice(0, 4);


    games.forEach(name => {

        const card =
            document.createElement("a");

        card.className =
            "more-game-card";

        card.href =
            "play.html?game=" +
            encodeURIComponent(name);


        card.innerHTML = `

            <img
                src="${moreGameImages[name]}"
                alt="${name}"
            >

            <span>
                ${name}
            </span>

        `;


        moreGamesGrid.appendChild(card);

    });

}


// START

loadMoreGames(game);

// Player features: favourites, likes, recently played, and play counts.
(async function initializePlayerGameFeatures() {
    const client = window.divisionSupabase;
    const favoriteButton = document.getElementById("favorite-game-button");
    const favoriteMessage = document.getElementById("favorite-game-message");
    const likeButton = document.getElementById("like-game-button");
    const likeCount = document.getElementById("like-game-count");
    const playCount = document.getElementById("game-play-count");

    if (!client || !game) return;

    const setMessage = (message) => {
        if (favoriteMessage) favoriteMessage.textContent = message;
    };

    try {
        const { data: gameRecord, error: gameError } = await client
            .from("games")
            .select("id,title,play_count")
            .eq("title", game)
            .eq("is_published", true)
            .maybeSingle();

        if (gameError) throw gameError;
        if (!gameRecord) {
            setMessage("This game is not linked to the player catalogue yet.");
            if (favoriteButton) favoriteButton.disabled = true;
            if (likeButton) likeButton.disabled = true;
            return;
        }

        const gameId = gameRecord.id;
        if (playCount) playCount.textContent = Number(gameRecord.play_count || 0).toLocaleString();

        // Count this game-page visit through a restricted database function.
        const { data: newPlayCount, error: playCountError } = await client
            .rpc("increment_game_play_count", { p_game_id: gameId });

        if (playCountError) {
            console.warn("DIVISION play count:", playCountError.message);
        } else if (playCount) {
            playCount.textContent = Number(newPlayCount).toLocaleString();
        }

        const { data: sessionData, error: sessionError } = await client.auth.getSession();
        if (sessionError) throw sessionError;
        const user = sessionData.session?.user || null;

        if (user) {
            const { error: recentError } = await client
                .from("recently_played")
                .upsert({
                    user_id: user.id,
                    game_id: gameId,
                    last_played_at: new Date().toISOString()
                }, { onConflict: "user_id,game_id" });

            if (recentError) console.warn("DIVISION recently played:", recentError.message);
        }

        // Favourites
        if (favoriteButton) {
            if (!user) {
                favoriteButton.disabled = false;
                favoriteButton.addEventListener("click", () => {
                    window.location.href = "./auth.html";
                });
                setMessage("Sign in to save this game.");
            } else {
                async function syncFavorite() {
                    const { data, error } = await client
                        .from("favorites")
                        .select("game_id")
                        .eq("user_id", user.id)
                        .eq("game_id", gameId)
                        .maybeSingle();

                    if (error) throw error;
                    const saved = Boolean(data);
                    favoriteButton.textContent = saved ? "♥ Saved to favourites" : "♡ Add to favourites";
                    favoriteButton.setAttribute("aria-pressed", String(saved));
                    favoriteButton.disabled = false;
                }

                favoriteButton.addEventListener("click", async () => {
                    favoriteButton.disabled = true;
                    try {
                        const { data: existing, error } = await client
                            .from("favorites")
                            .select("game_id")
                            .eq("user_id", user.id)
                            .eq("game_id", gameId)
                            .maybeSingle();

                        if (error) throw error;

                        const result = existing
                            ? await client.from("favorites").delete().eq("user_id", user.id).eq("game_id", gameId)
                            : await client.from("favorites").insert({ user_id: user.id, game_id: gameId });

                        if (result.error) throw result.error;
                        await syncFavorite();
                        setMessage(existing ? "Removed from favourites." : "Added to favourites.");
                    } catch (error) {
                        setMessage("Favourite error: " + error.message);
                        favoriteButton.disabled = false;
                    }
                });

                await syncFavorite();
            }
        }

        // Likes
        if (likeButton) {
            async function syncLike() {
                const { count, error: countError } = await client
                    .from("likes")
                    .select("*", { count: "exact", head: true })
                    .eq("game_id", gameId);

                if (countError) throw countError;
                if (likeCount) likeCount.textContent = Number(count || 0).toLocaleString();

                if (!user) {
                    likeButton.textContent = "♡ Like";
                    likeButton.disabled = false;
                    return;
                }

                const { data: ownLike, error: ownError } = await client
                    .from("likes")
                    .select("game_id")
                    .eq("user_id", user.id)
                    .eq("game_id", gameId)
                    .maybeSingle();

                if (ownError) throw ownError;
                likeButton.textContent = ownLike ? "♥ Liked" : "♡ Like";
                likeButton.setAttribute("aria-pressed", String(Boolean(ownLike)));
                likeButton.disabled = false;
            }

            likeButton.addEventListener("click", async () => {
                if (!user) {
                    window.location.href = "./auth.html";
                    return;
                }

                likeButton.disabled = true;
                try {
                    const { data: ownLike, error } = await client
                        .from("likes")
                        .select("game_id")
                        .eq("user_id", user.id)
                        .eq("game_id", gameId)
                        .maybeSingle();

                    if (error) throw error;

                    const result = ownLike
                        ? await client.from("likes").delete().eq("user_id", user.id).eq("game_id", gameId)
                        : await client.from("likes").insert({ user_id: user.id, game_id: gameId });

                    if (result.error) throw result.error;
                    await syncLike();
                } catch (error) {
                    console.error("DIVISION like error:", error);
                    likeButton.disabled = false;
                    likeButton.title = error.message;
                }
            });

            await syncLike();
        }
    } catch (error) {
        console.error("DIVISION player features:", error);
        setMessage("Could not load player features: " + error.message);
    }
})();


// DIVISION GAME COMMENTS
(async function initializeGameComments() {
    const client = window.divisionSupabase;
    const section = document.getElementById("division-comments");
    if (!client || !section || !game) return;
    const form = document.getElementById("comment-form");
    const input = document.getElementById("comment-input");
    const submit = document.getElementById("comment-submit");
    const status = document.getElementById("comment-status");
    const list = document.getElementById("comments-list");
    const countLabel = document.getElementById("comments-count");

    try {
        const { data: gameRow, error: gameError } = await client.from("games")
            .select("id").eq("title", game).eq("is_published", true).maybeSingle();
        if (gameError) throw gameError;
        if (!gameRow) { list.textContent = "Comments are unavailable for this game."; return; }

        const { data: sessionData } = await client.auth.getSession();
        const user = sessionData.session?.user || null;
        if (user) {
            submit.disabled = false;
            status.textContent = "Keep it respectful. Maximum 2,000 characters.";
        } else {
            input.disabled = true;
            submit.textContent = "Sign in to comment";
            submit.disabled = false;
            status.textContent = "You need an account to join the discussion.";
            submit.addEventListener("click", event => {
                event.preventDefault();
                window.location.href = "./auth.html";
            });
        }

        async function loadComments() {
            list.textContent = "Loading comments...";
            const { data, error } = await client.from("comments")
                .select("id,body,created_at,user_id,profiles(username,first_name,last_name,avatar_url)")
                .eq("game_id", gameRow.id).order("created_at", { ascending: false });
            if (error) throw error;
            countLabel.textContent = data.length + (data.length === 1 ? " comment" : " comments");
            list.replaceChildren();
            if (!data.length) {
                const empty = document.createElement("p");
                empty.className = "comments-empty";
                empty.textContent = "No comments yet. Start the conversation.";
                list.appendChild(empty);
                return;
            }
            data.forEach(comment => {
                const card = document.createElement("article");
                card.className = "comment-card";
                const top = document.createElement("div");
                top.className = "comment-card-top";
                const authorGroup = document.createElement("div");
                authorGroup.className = "comment-author";
                const avatar = document.createElement("span");
                avatar.className = "comment-avatar";
                if (comment.profiles?.avatar_url) {
                    const avatarImage = document.createElement("img");
                    avatarImage.src = comment.profiles.avatar_url;
                    avatarImage.alt = "";
                    avatar.appendChild(avatarImage);
                } else {
                    const first = (comment.profiles?.first_name || "").trim();
                    const last = (comment.profiles?.last_name || "").trim();
                    const username = (comment.profiles?.username || "DP").trim();
                    avatar.textContent = ((first[0] || "") + (last[0] || "")).toUpperCase()
                        || username.slice(0, 2).toUpperCase();
                }
                const author = document.createElement("strong");
                const displayName = [comment.profiles?.first_name, comment.profiles?.last_name].filter(Boolean).join(" ").trim();
                author.textContent = displayName || comment.profiles?.username || "DIVISION player";
                authorGroup.append(avatar, author);
                const date = document.createElement("time");
                date.dateTime = comment.created_at;
                date.textContent = new Date(comment.created_at).toLocaleString();
                top.append(authorGroup, date);
                const body = document.createElement("p");
                body.className = "comment-body";
                body.textContent = comment.body;
                card.append(top, body);
                if (user && comment.user_id === user.id) {
                    const remove = document.createElement("button");
                    remove.type = "button";
                    remove.className = "comment-delete";
                    remove.textContent = "Delete";
                    remove.addEventListener("click", async () => {
                        remove.disabled = true;
                        const { error: deleteError } = await client.from("comments")
                            .delete().eq("id", comment.id).eq("user_id", user.id);
                        if (deleteError) {
                            status.textContent = "Could not delete comment: " + deleteError.message;
                            remove.disabled = false;
                            return;
                        }
                        await loadComments();
                    });
                    card.appendChild(remove);
                }
                list.appendChild(card);
            });
        }

        if (user) form.addEventListener("submit", async event => {
            event.preventDefault();
            const body = input.value.trim();
            if (!body) { status.textContent = "Write a comment first."; return; }
            submit.disabled = true;
            status.textContent = "Posting...";
            const { error } = await client.from("comments").insert({ user_id: user.id, game_id: gameRow.id, body });
            if (error) {
                status.textContent = "Could not post comment: " + error.message;
                submit.disabled = false;
                return;
            }
            input.value = "";
            status.textContent = "Comment posted.";
            submit.disabled = false;
            await loadComments();
        });

        await loadComments();
    } catch (error) {
        console.error("DIVISION comments:", error);
        list.textContent = "Could not load comments: " + error.message;
    }
})();
