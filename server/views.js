var viewsDir = __dirname + '/../views/';

module.exports = {
    init: function (app) {
        app.set('view engine', 'pug');

        app.get('/products/:productId', function (req, res) {
            var productId = req.params.productId;

            res.render(viewsDir + productId);
        });

        app.get('/products/cache/:viewId', function (req, res) {
            var viewId = Number(req.params.viewId);

            var idsToCache = [];
            if (viewId < 4) {
                idsToCache = [1, 2, 3];
            } else {
                idsToCache = [10, 11, 12];
            }

            var urlsToCache = idsToCache.map(function (id) {
                return '/products/' + id;
            });

            urlsToCache = urlsToCache.concat(idsToCache.map(function(id) {
                return '/products/cache/' + id;
            }));

            if(viewId < 4) {
                urlsToCache.push('/gopro.png', '/charger.png', '/statyw.png')
            } else {
                urlsToCache.push('/atmega.png', '/plytka.png', '/diody.png');
            }
            res.send(JSON.stringify(urlsToCache, null, '\t'));
        });

        app.get('/', function (req, res) {
            res.render(viewsDir + 'index');
        });
    }
};

