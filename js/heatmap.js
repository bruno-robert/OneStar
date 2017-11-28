/*global $*/
/*global google*/
let map;
let mydata;
let t_pLat;
let t_pLng;

//creates a heatmap
function populateHeatMap(data) {
  let heatMapData = []; //array that stores the heatmap data

  //for each place, get coords and place in the array
  for (let key in data) {
    let lat = data[key]["coordinates"]["lat"];
    let lng = data[key]["coordinates"]["lng"];
    let placeWeight = data[key]['fine'].length;
    console.log(placeWeight);
    heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: placeWeight });
  }

  //creating the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(45.5016889, -73.567256),
    zoom: 14,
    minZoom: 11,
    maxZoom: 17,
    styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]

  });

  //creating the heatmap layer and populating it
  let heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.set('opacity', .8);
  heatmap.set('radius', 20); //radius of each spot
  heatmap.set('maxIntensity', 5); //set the intensity of the spots
  heatmap.set('gradient', ["rgba(255,255,255,0)", "#F5B705", "RGBA(246, 100, 39, 1.00)"]) //colour scheme
  heatmap.setMap(map); //set visible

}

function displayPlaceInfo(title, address, telephone) {
  $(".name").html(title);
  $(".bottom").html("");
  $(".bottom").append('<div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i><span class="address">' + address + '<span></div>');

}

//creates a markermap
function populateMarkerMap(data) {
  let markerMapData = []; //theoretically this array is pointless...

  //creates the map
  let map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(45.5016889, -73.567256),
    zoom: 14,
    minZoom: 11,
    maxZoom: 17,
    styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]

  });

  var image = {
    url: './marker.png',
    size: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15)
  };

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [0, 0, 30],
    type: 'circle'
  };

  //for each place, creates a marker
  for (let key in data) {
    let vlat = data[key]["coordinates"]["lat"];
    let vlng = data[key]["coordinates"]["lng"];
    let title = data[key]['name'];
    let address = data[key]['address'];

    //creation of the marker
    var marker = new google.maps.Marker({
      position: { lat: vlat, lng: vlng },
      map: map,
      title: title,
      icon: image,
      shape: shape
    });
    marker.addListener('click', () => displayPlaceInfo(title, address, null));
    markerMapData.push(marker);
  }

}


$.get('./data-grabber/data_complete.json', (data) => populateMarkerMap(data));
//$.get('./data-grabber/data_complete.json', (data) => populateHeatMap(data));
