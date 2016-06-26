this.addEventListener('install', function (event) {

    // var durr = fetch('/testviews/cache/1')
    //     .then(function (result) {
    //         var promise = result.json()
    //             .then(function (toCache) {
    //                 caches.open('offline')
    //                     .then(function (cache) {
    //                         cache.addAll(toCache);
    //                     });
    //             });
    //     });
    event.waitUntil(
        caches.open('offline').then(function (cache) {
            return cache.addAll([
                '/reqwest.js',
                '/jquery.js',
                '/bootstrap.js',
                '/sw.js',
                '/addServiceWorker.js',
                '/bootstrap.css'
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
