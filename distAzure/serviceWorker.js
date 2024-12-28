const cacheName = "edis-game_v1";

// hardcoded for now (to be improved.. autogenerate it)
const assets = [
  "/",
  "/index.html",
  "/assets/index-D-VLIVcx.css",
  "/assets/index-BLMf7nB6.js",
  "/handflute.m4a",
  "/laser.cur",
  "/img/almostEverybody.jpg",
  "/img/birdSmaller.jpg",
  "/img/coolMan.jpg",
  "/img/LionSmaller.jpg",
  "/img/mexico.jpg",
  "/img/PawPatrol.png",
  "/img/Pepa.jpg",
  "/img/PepaReal.jpg",

  "/icon/72.png",
  "/icon/128.png",
  "/icon/144.png",
  "/icon/152.png",
  "/icon/512.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching appContent");
      await cache.addAll(assets);
    })()
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service worker activated (clear items no longer chached)");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
