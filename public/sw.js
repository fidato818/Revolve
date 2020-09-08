let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                "/static/js/2.1cb1d183.chunk.js",
                "/static/js/main.d99066d4.chunk.js",
                "/static/css/main.0a1e4ae9.chunk.css",
                "/static/js/runtime-main.48fe03d4.js",
                "/static/media/Lusitana-Regular.b1023481.ttf",
                "/static/js/1.chunk.js",
                "/static/media/malte-wingen-PDX_a_82obo-unsplash.e6624e7e.jpg",
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                '/index.html',
                '/icons8-musical-48.png',
                '/images/icons/icon-144x144.png',
                '/manifest.json',
                '/lyrics/:id',
                '/',

            ])
        })
    )
})
this.addEventListener("fetch", (event) => {
    console.warn("event.request.url", event.request.url)
    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            // if (event.request.url) {
            event.waitUntil(
                this.registration.showNotification("Revolve | Lyrics Search", {
                    body: "Internet Disconnect, Check Your Connection",
                    icon: './icons8-musical-48.png'
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 