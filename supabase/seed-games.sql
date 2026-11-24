-- DIVISION legacy game catalogue sync
-- Generated from the current displayHomeGames catalogue in assets/script/script.js.
-- Safe to re-run: existing game slugs are updated, not duplicated.
-- Empty embed_url means the current legacy play.js handles that game; no URL was guessed.

insert into public.games
  (title, slug, thumbnail_url, embed_url, tags, category_id, is_published)
values
  ('Fragen', 'fragen', 'assets/game-thumbnails/1750532663_fragen.jpg', 'https://amongusplay.online/', array['Action', 'Shooting']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('War the knight', 'war-the-knight', 'assets/game-thumbnails/1751394909_war-the-knights-battle-arena-swords-3d.jpg', '', array['Action', 'Fighting']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Swag Flip', 'swag-flip', 'assets/game-thumbnails/1762451886_swagflip.jpg', '', array['Action', 'Arcade']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Funny City', 'funny-city', 'assets/game-thumbnails/1766118491_funny-city-gopniks.jpg', 'https://kiz10.com/embed-play/funny-city-gopniks/?img=22782/1766118491_funny-city-gopniks.webp', array['Action', 'Simulation']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Among Us', 'among-us', 'assets/game-thumbnails/among-us--online-edition_x.jpg', 'https://amongusplay.online/', array['Multiplayer', 'Action']::text[], (select id from public.categories where slug = 'multiplayer' limit 1), true),
  ('CoverSlap', 'coverslap', 'assets/game-thumbnails/coverslap.avif', '', array['Action', 'Arcade']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Ev.io', 'ev-io', 'assets/game-thumbnails/ev-io.avif', 'https://nite.games/embed/cod-zombies', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Stickman Daimond', 'stickman-daimond', 'assets/game-thumbnails/henry-stickman-daimond.webp', 'https://html5.gamemonetize.co/xsnm9j5pt4edsiibqgn1vd8i0twqrclp/', array['Action', 'Adventure']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('BoomNG.drive', 'boomng-drive', 'assets/game-thumbnails/igra-avarii-bum-drajv.jpg', '', array['Driving', 'Simulation', 'Cars']::text[], (select id from public.categories where slug = 'driving' limit 1), true),
  ('Realistic Driving', 'realistic-driving', 'assets/game-thumbnails/igra-realistichnyj-simulyator-vozhdeniya.jpg', '', array['Driving', 'Cars', 'Simulation']::text[], (select id from public.categories where slug = 'driving' limit 1), true),
  ('Ladderrex', 'ladderrex', 'assets/game-thumbnails/Ladderrex-512x384.jpg', 'https://smashkarts.io/', array['Arcade', 'Action']::text[], (select id from public.categories where slug = 'arcade' limit 1), true),
  ('Messanger', 'messanger', 'assets/game-thumbnails/messanger.jpeg', '', array['Action', 'Multiplayer']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Level Devil', 'level-devil', 'assets/game-thumbnails/level-devil.webp', 'https://level-devil.org/play/index.html', array['Action', 'Multiplayer']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('1v1.lol', '1v1-lol', 'assets/game-thumbnails/cover-1585728351086.avif', 'https://1v1-lol-online.github.io/file/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Racing Limits', 'racing-limits', 'assets/game-thumbnails/racing-limits-game_.jpg', '', array['Racing', 'Driving', 'Cars']::text[], (select id from public.categories where slug = 'racing' limit 1), true),
  ('Smash Karts', 'smash-karts', 'assets/game-thumbnails/smashkarat.webp', '', array['Racing', 'Driving', 'Multiplayer']::text[], (select id from public.categories where slug = 'racing' limit 1), true),
  ('Vortex 9', 'vortex-9', 'assets/game-thumbnails/vortex-9_o.jpg', 'https://www.miniplay.com/embed/vortex-9', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Shell Shockers', 'shell-shockers', 'assets/game-thumbnails/OSK.jpg', 'https://shellshock.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Punchers', 'punchers', 'assets/game-thumbnails/punchers.webp', 'https://games.crazygames.com/en_US/punchers/index.html?v=2.9', array['Fighting', 'Action']::text[], (select id from public.categories where slug = 'fighting' limit 1), true),
  ('DEADSHOT', 'deadshot', 'assets/game-thumbnails/1759579759538-Deadshot IO.jpg', 'https://deadshot.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Venge', 'venge', 'assets/game-thumbnails/OIP-venge.webp', 'https://venge.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Kour', 'kour', 'assets/game-thumbnails/kour.io_.webp', 'https://kour.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Krunker', 'krunker', 'assets/game-thumbnails/1200x744_krunker-io.jpg', 'https://krunker.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Kirka', 'kirka', 'assets/game-thumbnails/kirka-io.jpg', 'https://kirka.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('SandStrike', 'sandstrike', 'assets/game-thumbnails/sandstrike-sandstrike-io.webp', 'https://sandstrike.io/', array['Shooting', 'FPS', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('Voxiom', 'voxiom', 'assets/game-thumbnails/voxiom.webp', 'https://voxiom.io/', array['Shooting', 'FPS', 'Multiplayer', 'Building']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('BattleDudes', 'battledudes', 'assets/game-thumbnails/battledudesio.webp', 'https://battledudes.io/', array['Shooting', 'Multiplayer', 'Action']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('BuildRoyal', 'buildroyal', 'assets/game-thumbnails/build-royale-game-cover.webp', 'https://buildroyal.io/', array['Shooting', 'Building', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('ZombsRoyal', 'zombsroyal', 'assets/game-thumbnails/ZOMBS-ROYALE-Game.jpg', 'https://zombsroyal/', array['Shooting', 'Action', 'Multiplayer']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('NarrowOne', 'narrowone', 'assets/game-thumbnails/narrow-one-cover.avif', 'https://narrow.one/', array['Action', 'Multiplayer', 'Sports']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Davo', 'davo', 'assets/game-thumbnails/Davo-Unblocked-lg.webp', 'https://d11jzht7mj96rr.cloudfront.net/games/2025/construct/302/davo/index-ts.html', array['Action', 'Arcade']::text[], (select id from public.categories where slug = 'action' limit 1), true),
  ('Ragdoll Archers', 'ragdoll-archers', 'assets/game-thumbnails/ragdoll-archers.png', 'https://cdn.shawgames.com/ragdoll_archers/index.html', array['Shooting', 'Action', 'Arcade']::text[], (select id from public.categories where slug = 'shooting' limit 1), true),
  ('GTA Simulator', 'gta-simulator', 'assets/game-thumbnails/OIP.jpg', 'https://cdn.shawgames.com/gta-simulator/index.html', array['Driving', 'Cars', 'Action', 'Simulation']::text[], (select id from public.categories where slug = 'driving' limit 1), true),
  ('Wheelie Bike', 'wheelie-bike', 'assets/game-thumbnails/Wheelie-Bike.jpg', 'https://cdn.shawgames.com/wheelie_bike/index.html', array['Driving', 'Racing', 'Motorcycle']::text[], (select id from public.categories where slug = 'driving' limit 1), true),
  ('Eagle Craft', 'eagle-craft', 'assets/game-thumbnails/OIP (1).jpg', 'https://cdn.shawgames.com/eagle-craft/index.html', array['Adventure', 'Building', 'Survival']::text[], (select id from public.categories where slug = 'adventure' limit 1), true),
  ('Car Parking', 'car-parking', 'assets/game-thumbnails/igra-parkovka-mashin-advans.jpg', 'https://st.8games.net/14/igra-parkovka-mashin-advans/', array['Driving', 'Cars', 'Simulation']::text[], (select id from public.categories where slug = 'driving' limit 1), true),
  ('Ladybug Pregnant Caring', 'ladybug-pregnant-caring', 'assets/game-thumbnails/Ladybug-Pregnant-Caring.jpg', 'https://st.8games.net/9/igra-ukhod-za-beremennoj-ledi-bag/', array['Simulation', 'Casual']::text[], (select id from public.categories where slug = 'simulation' limit 1), true),
  ('Drift King', 'drift-king', 'assets/game-thumbnails/OIP.webp', 'https://cdn.shawgames.com/drift-king/index.html', array['Driving', 'Racing', 'Cars']::text[], (select id from public.categories where slug = 'driving' limit 1), true)
on conflict (slug) do update set
  title = excluded.title,
  thumbnail_url = excluded.thumbnail_url,
  embed_url = case
    when excluded.embed_url <> '' then excluded.embed_url
    else public.games.embed_url
  end,
  tags = excluded.tags,
  category_id = excluded.category_id,
  is_published = true,
  updated_at = now();

-- Check the synced catalogue:
select title, slug, is_published, thumbnail_url
from public.games
order by title;
