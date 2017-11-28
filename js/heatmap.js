/*global $*/
/*global google*/
let map;
let mydata;
let t_pLat;
let t_pLng;

function populateMap(data) {
  /* Data points defined as a mixture of WeightedLocation and LatLng objects */
  let heatMapData = [];

  for (let key in data) {
    let lat = data[key]["coordinates"]["lat"];
    let lng = data[key]["coordinates"]["lng"];
    let placeWeight = data[key]['fine'].length;
    console.log(placeWeight);
    heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: placeWeight });
  }

  //let Montreal = new google.maps.LatLng( 45.5016889,-73.567256);


  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(45.5016889, -73.567256),
    zoom: 14,
    minZoom: 11,
    maxZoom: 17,
    styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]

  });

  let heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.set('opacity', .8);
  heatmap.set('radius', 20);
  heatmap.set('maxIntensity', 5);
  heatmap.set('gradient', ["rgba(255,255,255,0)", "#F5B705", "RGBA(246, 100, 39, 1.00)"])
  heatmap.setMap(map);

}

$.get('./data-grabber/data_complete.json', (data) => populateMap(data));
