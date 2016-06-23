var pac = require('./phrasesAndConcepts');
var views = require('./views');
var email = require('../node_modules/emailjs/email');

const apiKey = 'BENIZZZ';

var server = email.server.connect({
    user: "czytomekszanuje@outlook.com",
    password: "dupa12345678",
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: true,
    timeout: 10000
});

module.exports = {
    init: function (app) {
        setupAdminApi(app);
    }
};

var setupAdminApi = function (app) {
    app.get('/phrases', function (req, res) {

        if (!authorize(req)) {
            views.redirectToErrorPage(res);
            return;
        }
        var phrases = pac.loadPhrases();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(phrases, null, '\t'));
    });

    app.get('/concepts', function (req, res) {

        if (!authorize(req)) {
            views.redirectToErrorPage(res);
            return;
        }
        var concepts = pac.loadConcepts();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(concepts, null, '\t'));
    });

    app.get('/update/:phrase/:concept/:respectValue?', function (req, res) {
        if (!authorize(req)) {
            views.redirectToErrorPage(res);
            return;
        }

        updatePhrases(req);
        sendNewPhrasesAndKeywords();

        res.send('DENK YOU BERY MUCH :DDDDDD');
    });
}

var updatePhrases = function (req) {
    var phrase = req.params.phrase;
    var concept = req.params.concept;
    var respectValue = req.params.respectValue;
    var phrases = pac.loadPhrases();
    phrases[phrase] = concept;
    var concepts = pac.loadConcepts();

    if (concepts[concept]) {
        if (respectValue) {
            concepts[concept] = respectValue;
        }
    } else {
        if (!respectValue) {
            respectValue = pac.defaultRespectValue;
        }
        concepts[concept] = respectValue;
    }

    pac.saveConcepts(concepts);
    pac.savePhrases(phrases);
}

var authorize = function (req) {
    var benitoHeader = req.get('X-Benito');

    if (!benitoHeader) {
        return false;
    }
    
    if (benitoHeader.indexOf(apiKey) === -1) {
        return false;
    }

    return true;
}

var sendNewPhrasesAndKeywords = function () {
    server.send({
        text: new Date().toDateString(),
        from: "Szanel <czytomekszanuje@outlook.com>",
        to: "<jankowski.jakub@outlook.com>",
        subject: "[CzyTomekSzanuje] Nowe frazy/koncepty",
        attachment: [
            {
                data: pac.getPhrasesFile(),
                name: 'phrases.json'
            },
            {
                data: pac.getConceptsFile(),
                name: 'concepts.json'
            }
        ]
    }, function (err, message) { console.log(err || message); });
};