this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('offline').then(function (cache) {
            return cache.addAll([
                '/reqwest.js',
                '/jquery.js',
                '/bootstrap.js',
                '/sw.js',
                '/addServiceWorker.js',
                '/addGenericServiceWorker.js',
                '/bootstrap.css',
                '/site.css'
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {
    var request = event.request;
    var url = request.url;

    if (url.indexOf('/products/') !== -1) {
        cacheViews(url);
    }

    event.respondWith(
        caches.match(request)
            .then(function (response) {
                if (response) {
                    //console.log('returning match');
                    return response;
                }
                return fetch(request)
                    .catch(function (error) {
                        console.log('An error has occured', error)
                    });
            })
    );
});


var cacheViews = function (url) {
    var spliited = url.split('/');
    var productId = spliited[spliited.length - 1];

    var request = '/products/cache/' + productId;
    // var response = caches.match(request)
    //     .then(function (response) {
    //         if (response) {
    //             //console.log('returning match');
    //             console.log(response);
    //             return response;
    //         } else {
    //             return fetch(request)
    //                 .then(function (result) {
    //                     var promise = result.json()
    //                         .then(function (toCache) {
    //                             caches.open('offline')
    //                                 .then(function (cache) {
    //                                     cache.addAll(toCache);
    //                                     console.log('successfully cached views:');
    //                                     console.log(toCache);
    //                                 });
    //                         });
    //                 })
    //                 .catch(function (error) {
    //                     console.log('An error has occured', error)
    //                 });
    //         }
    //     });

    try {
        fetch(request)
            .then(function (result) {
                var promise = result.json()
                    .then(function (toCache) {
                        caches.open('offline')
                            .then(function (cache) {
                                cache.addAll(toCache);
                                console.log('successfully cached views:');
                                console.log(toCache);
                            });
                    })
                    .catch(function (error) {
                        console.log("Coś się popsuło 2", error);
                    });
            })
            .catch(function (error) {
                console.log("Coś się popsuło", error);
            });
    }
    catch (err) {
        console.log("Coś się popsuło 3", err);
    }
};
