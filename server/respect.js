var fs = require('fs');
var pac = require('./phrasesAndConcepts');

const defaultRespectValue = 5;

module.exports = {
    init: function (app) {
        app.get('/respect/:phrase?', function (req, res) {
            var phrase = req.params.phrase;
            var respectValue = getRespectValue(phrase);
            res.json(respectValue);
        });
    },
    defaultRespectValue: defaultRespectValue
};

var getRespectValue = function (phrase) {
    var phrasesToConcepts = pac.loadPhrases();
    var conceptsToValues = pac.loadConcepts();
    if (!phrase || typeof (phrase) !== 'string') {
        return defaultRespectValue;
    }

    var concept = phrasesToConcepts[phrase];

    if (!concept || concept === null || concept === 'undefined') {
        return defaultRespectValue;
    }

    return conceptsToValues[concept];
}
