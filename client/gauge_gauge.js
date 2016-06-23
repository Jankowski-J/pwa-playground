const defaultRespectValue = 5;

var $searchButton = $('#searchButton');

var _checkRespect = function () {

  var $input = $('#phrase');
  var phrase = $input.val().toLowerCase();

  reqwest({
    url: 'respect/' + phrase,
    error: function (err) {
      console.log(err);
    },
    success: function (response) {

      updateControls(response);
    }
  });
};

var updateControls = function (respectValue) {
  if (respectValue) {
    GAUGE.setGaugeValue(respectValue)
  }

  var respectText = $('#respectText');
  var respectTextValue = getRespectText(respectValue);
  respectText.text(respectTextValue);

  var level = 'neutral';
  if (respectValue > defaultRespectValue) {
    level = 'high';
  }
  else if (respectValue < defaultRespectValue) {
    level = 'low';
  }
  var respectImage = $('#gajger-pic');
  respectImage.attr('src', '../' + level + '.png');
};

$searchButton.on('click', _checkRespect);

var getRespectText = function (respectValue) {
  if (!respectValue && respectValue !== 0) {
    return 'Tomek jest neutralny';
  }

  if (respectValue > defaultRespectValue) {
    return 'Tomek szanuje';
  } else if (respectValue < defaultRespectValue) {
    return 'Tomek nie szanuje';
  } else {
    return 'Tomek jest neutralny';
  }
};

var checkRespect = function (event) {
  event.preventDefault();
  _checkRespect();
};