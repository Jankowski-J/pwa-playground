self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('offline').then(function (cache) {
            return cache.addAll([
                '/reqwest.js',
                '/jquery-3.1.1.min.js',
                '/bootstrap.min.js',
                '/rootServiceWorker.js',
                '/bootstrap.min.css',
                '/addServiceWorker.js',
                '/addGenericServiceWorker.js',
                '/site.css',
                '/',
                '/rootServiceWorker.js',
            ]);
        }).catch(function(err) {
            console.error("error while caching", err);
        })
    );
});

self.addEventListener('fetch', function (event) {
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
    console.log(url);
    var spliited = url.split('/');
    var productId = spliited[spliited.length - 1];

    var request = '/products/cache/' + productId;

    fetch(request)
        .then(function (result) {
            var promise = result.json()
                .then(function (toCache) {
                    tryCache(toCache);
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
