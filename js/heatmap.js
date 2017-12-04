/*global $*/
/*global google*/
let map;
let mydata;
let t_pLat;
let t_pLng;

//Sets first letter of a string to upercase
function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//sets all letters in string to lower case exept fo rthe first letter of each word
function lowerCaseAllWordsExceptFirstLetters(string) {
  return string.replace(/\w\S*/g, function(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

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

//when using a mobile device or a small window, then this will display teh information pane when you select a place
function displayInfoPane() {
  // Check
  document.getElementById("nav-trigger").checked = true;
  $('#side').addClass('side2');
  $('#map').addClass('map2');
  $('#toggle').addClass('toggle_container2');
  $('#nav').addClass('nav2');
  $('#nav-trigger').siblings('label').html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');

}

//when using a mobile device or a small window, then this will hide teh information pane
function hideInfoPane() {
  // Uncheck
  document.getElementById("nav-trigger").checked = false;
  $('#side').removeClass('side2');
  $('#map').removeClass('map2');
  $('#toggle').removeClass('toggle_container2');
  $('#nav').removeClass('nav2');
  $('#nav-trigger').siblings('label').html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
}

//given a google_id, it populates the side bar wit hsome extra data
/*function getPlaceInfo(placeID) {
  let url = 'https://maps.googleapis.com/maps/api/place/details/json?';
  let info = 'key=AIzaSyAOFtHfpkCMyIim6wEFoPGW-Qlyu5nbPuA&placeid=' + placeID;
  console.log(url + info);
  $.post(url, info, function(data) {
    alert("hi");
    //adding telephone
    $(".bottom").append('<div class="phone"><i class="fa fa-phone" aria-hidden="true"></i><span class="tel">' + data.formatted_phone_number + '< span > << / div > ');

    //adding website
    $(".bottom").append('<div class="web"><i class="fa fa-globe" aria-hidden="true"></i><span class="site">' + data.url + '<span></div>');


  }, 'json');
}*/

//updates the InfoPane's information (html)
function displayPlaceInfo(title, address, fine_date, fine, reason, phone, website, reviews) {
  //adding telephone
  if (!(phone = "")) {
    $(".bottom").append('<div class="phone"><i class="fa fa-phone" aria-hidden="true"></i><span class="tel">' + phone + '< span > << / div > ');
  }

  //adding website
  if (!(website == "")) {
    $(".bottom").append('<div class="web"><i class="fa fa-globe" aria-hidden="true"></i><span class="site">' + website + '<span></div>');
  }

  //adding establishment name
  title = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(title));
  $(".name").html(title);

  //calculates the total of the fines (the fines are strings and need to be changed to integers/doubles)
  let total_fines = 0;
  for (let i = 0; i < fine.length; i++) {
    total_fines += Number(fine[i].replace(/[^0-9\.-]+/g, ""));
  }
  $(".amount").html("$" + total_fines);


  $(".bottom").html(""); //emptying the previous data

  //adding address
  $(".bottom").append('<div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i><span class="address">' + address + '<span></div>');

  $(".bottom").append(' <div class="infraction">');
  for (let i = 0; i < fine.length; i++) {
    $(".infraction").append('<div class="finedate">Date of infraction<br><span class="date">' + fine_date[i] + '<span></div>');
    $(".infraction").append(' <div class="fineamount">Amount<br><span class="total">' + fine[i] + '<span></div>');

    $(".infraction").append('<div class="description">' + reason[i] + '</div>');
  }
  $(".bottom").append('</div>');

  if ($(window).width() <= 700) {
    displayInfoPane();
  }

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
    let fine = data[key]['fine'];
    let fine_date = data[key]['fine_date'];
    let reason = data[key]['reason'];
    let phone = data[key]['phone'] //this may be an empty string
    let website = data[key]['url'] //this may be an empty string
    let reviews = data[key]['reviews'] //this is an array

    //creation of the marker
    var marker = new google.maps.Marker({
      position: { lat: vlat, lng: vlng },
      map: map,
      title: title //,
      //icon: image,
      //shape: shape
    });
    marker.addListener('click', () => displayPlaceInfo(title, address, fine_date, fine, reason, phone, website, reviews));
    markerMapData.push(marker);
  }

}


$.get('./data-grabber/maxed_data.json', (data) => populateMarkerMap(data), 'json');
