// index.js
// Note:
// - 'L' is imported from leaflet.js in index.html
// - 'decodeToCorners()' is imported from geohash.js in index.html

let map;

/// OsmMap:
class OsmMap {

  // OsmMap()
  constructor(id) {
    // map:
    this.map = L.map(id);
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; ' +
          '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      })
      .addTo(this.map);
    // rectColors:
    this.rectColors = [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      '#ffff00'
    ];
    // iRectColors:
    this.iRectColors = 0;
  }

  // show()
  show(latLng=null, zoom=3) {
    if (latLng == null) {
      latLng = [0.0, 0.0];
    }
    this.map.setView(latLng, zoom);
  }

  // addRect()
  addRect(bounds, label='') {
    const i = this.iRectColors;
    L.rectangle(
      bounds, {
        color: this.rectColors[i],
        fillOpacity: 0.1,
        weight: 1
      })
      .addTo(this.map)
      .bindTooltip(label , {
        direction: 'top',
        permanent: true
      })
      .openTooltip();
    this.iRectColors = (i + 1 < this.rectColors.length) ? (i + 1) : 0;
  }
}

// onGeohashesInput()
function onGeohashesInput(text) {
  geohashes = text.split(',').map((s) => s.trim());
  geohashes.forEach((geohash) => {
    bounds = decodeToCorners(geohash);
    console.log(geohash, bounds);
    map.addRect(bounds, geohash);
  });
}

// main():
function main() {
  // input(type="search"):
  const input = document.body.querySelector('#input');
  input.addEventListener('search', () => {
    onGeohashesInput(input.value);
  });
  // map:
  map = new OsmMap('map');
  map.show();
}

// DOMContentLoaded:
window.addEventListener('DOMContentLoaded', () => {
  main();
});
