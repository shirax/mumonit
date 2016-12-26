initialPrice = 11.0;
TARIF = {
  '1': {
    'includedSeconds': 80,
    'includedMeters': 537.93,
    'distanceBeatUntil15km': 87.32,
    'distanceBeatAbove15km': 72.82,
    'timeBeatEveryXSeconds': 12
  },
  '2': {
    'includedSeconds': 35,
    'includedMeters': 147.89,
    'distanceBeatUntil15km': 69.87,
    'distanceBeatAbove15km': 58.17,
    'timeBeatEveryXSeconds': 10
  },
}
document.getElementById("calc-btn").onclick = function() {calculatePrice()};
function calculatePrice() {
  var tarif = document.getElementById('tarif')
    .value;
  var hours = parseInt(document.getElementById('duration-hours')
    .value);
  var minutes = parseInt(document.getElementById('duration-minutes')
    .value);
  var seconds = parseInt(document.getElementById('duration-seconds')
    .value);
  var distance = parseFloat(document.getElementById('distance')
    .value);

  var includedSeconds = TARIF[tarif]['includedSeconds'];
  var includedMeters = TARIF[tarif]['includedMeters'];
  var distanceBeatUntil15km = TARIF[tarif]['distanceBeatUntil15km'];
  var distanceBeatAbove15km = TARIF[tarif]['distanceBeatAbove15km'];
  var timeBeatEveryXSeconds = TARIF[tarif]['timeBeatEveryXSeconds'];

  var duration = hours * 3600 + minutes * 60 + seconds;
  if (duration > includedSeconds) {
    duration = duration - includedSeconds;
    var durationBeats = duration / timeBeatEveryXSeconds;
  } else {
    durationBeats = 0;
  }

  distance = distance * 1000;
  if (distance > 15000) {
    var d1 = 15000;
    var d2 = distance - d1;
  } else {
    var d1 = distance;
    var d2 = 0;
  }
  if (d1 > includedMeters) {
    d1 = d1 - includedMeters;
    var distanceBeats = d1 / distanceBeatUntil15km + d2 / distanceBeatAbove15km;
  } else {
    distanceBeats = 0;
  }

  var beats = distanceBeats + durationBeats;
  var price = initialPrice + beats * 0.3;
  price = price.toFixed(2);

  var priceDiv = document.getElementById('price');
  priceDiv.innerHTML = '<h2>עלות הנסיעה בש"ח</h2>' + price
};
