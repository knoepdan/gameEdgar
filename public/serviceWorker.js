const edisGameCacheName = "edis-game";

// hardcoded for now (to be improved.. autogenerate it)
const assets = [
  "/",
  "/index.html",
  "/assets/index-D-VLIVcx.css",
  "/assets/index-DBsr2Z61.js",
  "/handflute.m4a",
  "/laser.cur",
  "/img/almostEverybody.jpg",
  "/img/birdSmaller.jpg",
  "/img/coolMan.jpg",
  "/img/LionSmaller.jpg",
  "/img/mexico.jpg",
  "/img/PawPatrol.jpg",
  "/img/Pepa.jpg",
  "/img/PepaReal.jpg",
  // service worker  (probably not needed)
  "/serviceWorker.js",
  "serviceWorker.js",
  // same
  "index.html",
  "assets/index-D-VLIVcx.css",
  "assets/index-DBsr2Z61.js",
  "handflute.m4a",
  "laser.cur",
  "img/almostEverybody.jpg",
  "img/birdSmaller.jpg",
  "img/coolMan.jpg",
  "img/LionSmaller.jpg",
  "img/mexico.jpg",
  "img/PawPatrol.jpg",
  "img/Pepa.jpg",
  "img/PepaReal.jpg",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(edisGameCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
