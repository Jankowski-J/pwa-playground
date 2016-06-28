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
                '/site.css',
                '/',
                '/rootServiceWorker.js',
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {
    var request = event.request;
    var url = request.url;

    if (url.indexOf('/products/') !== -1) {
        console.log(event);
        cacheViews(url);
    }

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

var cacheViews = function (url) {
    console.log(url);
    var spliited = url.split('/');
    var productId = spliited[spliited.length - 1];

    var request = '/products/cache/' + productId;

    fetch(request)
        .then(function (result) {
            var promise = result.json()
                .then(function (toCache) {
                    tryCache(toCache);
                    // caches.open('views')
                    //     .then(function (cache) {
                    //         cache.addAll(toCache);
                    //         console.log('successfully cached views:');
                    //         console.log(toCache);
                    //     })
                    //     .catch(function (error) {
                    //         console.log("Coś się popsuło 4", error);
                    //     });
                })
        })
        .catch(function (error) {
            console.log("Coś się popsuło", error);
        });

};

var tryCache = function (urls) {
    urls.forEach(function (url) {
        caches.match(url).then(function (response) {
            if (!response) {
                caches.open('views').then(function (cache) {
                    cache.add(url);
                })
            }
        });
    });
};
