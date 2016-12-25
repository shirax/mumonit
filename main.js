initial_price = 11.0;
TARIF = {
  '1': {
    'included_seconds': 80,
    'included_meters': 537.93,
    'distance_beat_until_15km': 87.32,
    'distance_beat_above_15km': 72.82,
    'time_beat_every_x_seconds': 12
  },
  '2': {
    'included_seconds': 35,
    'included_meters': 147.89,
    'distance_beat_until_15km': 69.87,
    'distance_beat_above_15km': 58.17,
    'time_beat_every_x_seconds': 10
  },
}

function calculatePrice() {
  var tarif = document.getElementById('tarif')
    .value;
  var hours = parseInt(document.getElementById('duration_hours')
    .value);
  var minutes = parseInt(document.getElementById('duration_minutes')
    .value);
  var seconds = parseInt(document.getElementById('duration_seconds')
    .value);
  var distance = parseFloat(document.getElementById('distance')
    .value);

  var included_seconds = TARIF[tarif]['included_seconds'];
  var included_meters = TARIF[tarif]['included_meters'];
  var distance_beat_until_15km = TARIF[tarif]['distance_beat_until_15km'];
  var distance_beat_above_15km = TARIF[tarif]['distance_beat_above_15km'];
  var time_beat_every_x_seconds = TARIF[tarif]['time_beat_every_x_seconds'];

  var duration = hours * 3600 + minutes * 60 + seconds;
  duration = duration - included_seconds;
  var duration_beats = duration / time_beat_every_x_seconds;

  distance = distance * 1000;
  if (distance > 15000) {
    var d1 = 15000;
    var d2 = distance - d1;
  } else {
    var d1 = distance;
    var d2 = 0;
  }

  d1 = d1 - included_meters;

  var distance_beats = d1 / distance_beat_until_15km + d2 / distance_beat_above_15km;

  var beats = distance_beats + duration_beats;
  var price = initial_price + beats * 0.3;
  price = price.toFixed(2);

  var priceDiv = document.getElementById('price');
  priceDiv.innerHTML = '<h2>עלות הנסיעה בש"ח</h2>' + price
}
