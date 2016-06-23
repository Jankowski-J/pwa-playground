this.addEventListener('install', function (event) {

    var durr = fetch('/testviews/cache/1')
        .then(function (result) {
            var promise = result.json()
                .then(function (toCache) {
                    caches.open('offline')
                        .then(function (cache) {
                            cache.addAll(toCache);
                        });
                });
        });
    event.waitUntil(
        caches.open('offline').then(function (cache) {
            return cache.addAll([
                '/ryj_gajgera_5.png',
                '/ryj_gajgera_6.png',
                '/benis',
                '/reqwest.js',
                '/gauge.js',
                '/jquery.js',
                '/bootstrap.js',
                '/sw.js',
                '/gauge_gauge.js',
                '/gaugeController.js',
                '/addServiceWorker.js',
                '/site.css',
                '/bootstrap.css',
                '/gauge.min.js',
                '/counter_2.png'
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
                    console.log('returning match');
                    return response;
                }
                return fetch(request)
                    .catch(function (error) {
                        console.log('An error has occured', error)
                    });
            })
    );
});
