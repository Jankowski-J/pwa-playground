var fs = require('fs');
var phrasesFileName = 'phrases.json';
var conceptsFileName = 'concepts.json';

var getConceptsFilePath = function () {
    return __dirname + '/' + conceptsFileName;
};

var getPhrasesFilePath = function () {
    return __dirname + '/' + phrasesFileName;
};

module.exports = {
    loadPhrases: function () {
        var phrases = fs.readFileSync(getPhrasesFilePath());
        return JSON.parse(phrases);
    },
    loadConcepts: function () {
        var concepts = fs.readFileSync(getConceptsFilePath());
        return JSON.parse(concepts);
    },
    savePhrases: function (phrases) {
        var stringified = JSON.stringify(phrases, null, '\t');
        fs.writeFileSync(getPhrasesFilePath(), stringified);
    },
    saveConcepts: function (phrases) {
        var stringified = JSON.stringify(phrases, null, '\t');
        fs.writeFileSync(getConceptsFilePath(), stringified);
    },
    getPhrasesFile: function() {
        return fs.readFileSync(getPhrasesFilePath());
    },
    getConceptsFile: function() {
        return fs.readFileSync(getConceptsFilePath());
    }
};

