var GAUGE = {}

var opts = {
  lines: 12,
  angle: 0.21,
  lineWidth: 0.6,
  pointer: {
    length: 0.7,
    strokeWidth: 0.035,
    color: '#000000' // 
  },
  limitMax: 'false',
  colorStart: '#FFFFFF',
  colorStop: '#FFFFFF',
  strokeColor: '#FFFFFF',
  generateGradient: true,
};

var target = $('#gauge-canvas')[0]; // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 10; // set max gauge value
gauge.animationSpeed = 32; // set animation speed (32 is default value)
gauge.set(5); // set actual value

GAUGE.setGaugeValue = function (value) {
  gauge.set(value)
};