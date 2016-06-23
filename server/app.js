var express = require('express');
var views = require('./views');
var respect = require('./respect');
var path = require('path');
var admin = require('./admin');

var app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../content')));

views.init(app);
respect.init(app);
admin.init(app);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('*', function (req, res) {
  views.redirectToErrorPage(res);
});
