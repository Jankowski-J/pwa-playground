var express = require('express');
var views = require('./views');
var path = require('path');
var compression = require('compression');

var app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../content')));

views.init(app);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
