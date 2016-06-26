var viewsDir = __dirname + '/../views/';

module.exports = {
    init: function (app) {
        app.set('view engine', 'pug');

        app.get('/testviews/:viewId', function (req, res) {
            var viewId = req.params.viewId;

            res.render(viewsDir + viewId);
        });

        app.get('/testviews/cache/:viewId', function (req, res) {
            var viewId = Number(req.params.viewId);

            var idsToCache = [];
            if (viewId < 6) {
                idsToCache = [1, 2, 3, 4, 5];
            } else {
                idsToCache = [6, 7, 8, 9, 10];
            }

            var viewsToCache = idsToCache.map(function (id) {
                return '/testviews/' + id;
            });
            res.send(JSON.stringify(viewsToCache, null, '\t'));
        });

        app.get('/', function (req, res) {
            res.render(viewsDir + 'index');
        });
    }
};

