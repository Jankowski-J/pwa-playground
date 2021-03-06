self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('offline')
            .then(function (cache) {
            return cache.addAll([
                '/reqwest.js',
                '/jquery-3.1.1.min.js',
                '/bootstrap.min.js',
                '/rootServiceWorker.js',
                '/addServiceWorker.js',
                '/bootstrap.min.css',
                '/',
                '/gopro.png', 
                '/charger.png', 
                '/statyw.png',
                '/atmega.png', 
                '/plytka.png', 
                '/diody.png'
            ])
        }).catch(function(err) {
            console.error("error while caching", err);
        })
    );
});

self.addEventListener('fetch', function (event) {
    var request = event.request;

    event.respondWith(
        caches.match(request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(request)
                    .catch(function (error) {
                        console.log('An error has occured', error, request)
                    });
            })
    );
});
