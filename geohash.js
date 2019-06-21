// geohash.js
'use strict';

const BASE32 = Array.from('0123456789bcdefghjkmnpqrstuvwxyz');
const BASE32_TO_DECIMAL = BASE32.reduce((acc, cur, i) => {
  acc[cur] = i;
  return acc;
}, {});
const bits2char = ((b) => BASE32[b]);
const char2bits = ((c) => BASE32_TO_DECIMAL[c]);


// mid()
function mid(seq) {
  console.assert(seq.length === 2);
  return (seq[0] + seq[1]) / 2.0;
}
// lowerHalf()
function lowerHalf(seq) {
  console.assert(seq.length === 2);
  return [seq[0], mid(seq)];
}
// upperHalf()
function upperHalf(seq) {
  console.assert(seq.length === 2);
  return [mid(seq), seq[1]];
}

// decode()
function decode(geohash) {
  let latRange = [-90.0, +90.0];
  let lngRange = [-180.0, +180.0];
  Array.from(geohash).forEach((c, i) => {
    const bits = char2bits(c);
    const nBits = 5;
    for (let iBits = 0; iBits < nBits; iBits++) {
      const masked = bits & (0b10000 >> iBits);
      if ((i * nBits + iBits) % 2 === 0) {
        // lng
        if (masked === 0) {
          lngRange = lowerHalf(lngRange);
        } else {
          lngRange = upperHalf(lngRange);
        }
      } else {
        // lat
        if (masked === 0) {
          latRange = lowerHalf(latRange);
        } else {
          latRange = upperHalf(latRange);
        }
      }
    }
  });
  return [latRange, lngRange]
}

// decodeToCorners(): return [bottomLeft, topRight];
function decodeToCorners(geohash) {
  const latLngRange = decode(geohash);
  return [
    [latLngRange[0][0], latLngRange[1][0]],
    [latLngRange[0][1], latLngRange[1][1]]
  ];
}

// test:
//const latLngRange = decode('xn76urx61zq')
//console.assert(latLngRange[0][0] <= 35.68123 && 35.68123 < latLngRange[0][1]);
//console.assert(latLngRange[1][0] <= 139.76712 && 139.76712 < latLngRange[1][1]);
