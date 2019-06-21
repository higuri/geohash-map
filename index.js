// index.js

// main():
function main() {
  const map = L.map('map').setView(
    [35.68123, 139.76712],  // Tokyo Station.
    5
  );
  L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })
    .addTo(map);
}

// DOMContentLoaded:
window.addEventListener('DOMContentLoaded', () => {
  main();
});
