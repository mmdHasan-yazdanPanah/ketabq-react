/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts('/workbox-sw-4.3.1.js');

importScripts('/precache-manifest.97b9eaf601f98f843861a75668531616.js');

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('/index.html'),
    {
        blacklist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
    }
);

workbox.routing.registerRoute(
    // Custom `matchCallback` function
    function ({ event }) {
        return (
            event.request.destination === 'audio' ||
            event.request.destination === 'video'
        );
    },
    new workbox.strategies.CacheFirst({
        cacheName: 'Book Audio',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            }),
        ],
    })
);
