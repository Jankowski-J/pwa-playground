this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('offline').then(function (cache) {
            return cache.addAll([
                '/reqwest.js',
                '/jquery.js',
                '/bootstrap.js',
                '/rootServiceWorker.js',
                '/addServiceWorker.js',
                '/bootstrap.css',
                '/',
                '/gopro.png', 
                '/charger.png', 
                '/statyw.jpg',
                '/atmega.jpg', 
                '/plytka.jpg', 
                '/diody.jpg'
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {
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
