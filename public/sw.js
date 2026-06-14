// Minimal service worker — satisfies Chrome's PWA installability criteria.
// Passes all requests through to the network; returns a graceful offline
// message if the network is unavailable.
const CACHE = "sah-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));

self.addEventListener("fetch", (e) => {
  // Only handle GET requests; let POST/PUT/DELETE pass through untouched.
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).catch(
      () =>
        new Response("You appear to be offline. Please check your connection.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        })
    )
  );
});
