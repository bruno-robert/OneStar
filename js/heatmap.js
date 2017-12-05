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

function setStars() {

  var rating2 = document.querySelector(".rating2");

  var num = document.getElementById('rating');
  var rating = num.textContent || num.innerText;

  function displayRating(rating = 0, stars = 5) {
    const CONTAINER = document.getElementById("dynamic-rating2"),
      FILLED_CLASS = 'star--fill',
      HALF_CLASS = 'star--half'

    let previous = 0,
      classes = '',
      starsDisplay = '<div class="starrating">'

    // Loop through all stars (1 - 5) to decide their display
    for (let current = 1; current <= stars; current++) {
      // Determine which class to display
      (rating > previous && rating < current) ?
      classes = HALF_CLASS: (rating >= current) ?
        classes = FILLED_CLASS :
        classes = ''

      // Generate required HTML
      starsDisplay += `
				<div class="star  ${classes}">
					<svg class="icon  icon--star-left">
						<use xlink:href="#icon-star-left"></use>
					</svg>
					<svg class="icon  icon--star-right">
						<use xlink:href="#icon-star-right"></use>
					</svg>
				</div>`

      previous++
    }

    starsDisplay += `</div>`

    $("#dynamic-rating").html(starsDisplay);
  }



  // Inject star rating HTML
  displayRating(rating)
  //rating2.innerHTML = rating;

}

//updates the InfoPane's information (html)
function displayPlaceInfo(title, address, fine_date, fine, reason, phone, website, reviews, rating) {


  //adding establishment name
  title = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(title));
  $(".name").html(title);
  if (rating == "") {
    $('.rating').html(1);
  }
  else {
    $('.rating').html(rating);
  }
  setStars();

  //calculates the total of the fines (the fines are strings and need to be changed to integers/doubles)
  let total_fines = 0;
  for (let i = 0; i < fine.length; i++) {
    total_fines += Number(fine[i].replace(/[^0-9\.-]+/g, ""));
  }
  $(".amount").html("$" + total_fines);


  $(".bottom").html(""); //emptying the previous data
  
  //adding telephone
  if (!(phone == "")) {
    $(".bottom").append('<div class="phone"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 31.53 31.46"><title>Asset 2</title><path d="M30.82,24.88,26,20a2.55,2.55,0,0,0-3.58.07l-2.45,2.45-.48-.27A24.43,24.43,0,0,1,13.54,18a24.56,24.56,0,0,1-4.28-5.92L9,11.61,10.64,10l.81-.81a2.53,2.53,0,0,0,.07-3.58L6.65.71A2.54,2.54,0,0,0,3.07.77L1.7,2.15l0,0a8.08,8.08,0,0,0-1.63,4C-.54,11.54,1.89,16.41,8.5,23c9.14,9.14,16.5,8.45,16.82,8.41a8,8,0,0,0,4-1.63l0,0,1.39-1.36a2.55,2.55,0,0,0,.06-3.59Z" style="fill:#f3b721"/></svg>&nbsp;&nbsp;<span class="tel">' + phone + '</span> </div> ');
  }

  //adding website

  if (website != "") {
    console.log(website);
    $(".bottom").append('<div class="web"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 31.2 31.2"><title>Asset 4</title><path d="M28.55,6.92l-.46.15-2.49.22-.7,1.12-.51-.16-2-1.79-.3-.92-.38-1L20.5,3.43,19,3.15l0,.67,1.44,1.4.7.83-.79.41-.65-.19-1-.4,0-.78-1.26-.52L17.09,6.4l-1.28.29.13,1L17.6,8l.29-1.63,1.37.2.63.37h1l.7,1.41,1.85,1.88-.13.73-1.5-.19-2.59,1.31-1.86,2.23-.24,1h-.67l-1.24-.57L14,15.33l.3,1.28.52-.61.93,0-.07,1.15.77.22.77.86,1.25-.35,1.43.22,1.66.45.83.1,1.4,1.59,2.71,1.6-1.75,3.35L22.92,26l-.7,1.91-2.68,1.79-.28,1A15.57,15.57,0,0,0,28.55,6.92Z" style="fill:#f3b721"/><path d="M17.39,23.75l-1.13-2.1,1-2.17-1-.32L15.09,18l-2.6-.58-.86-1.81v1.07h-.38L9,13.64V11.15L7.38,8.49,4.77,9H3l-.88-.58,1.12-.89-1.12.26A15.58,15.58,0,0,0,15.6,31.2a18.25,18.25,0,0,0,2-.13l-.17-1.89s.72-2.81.72-2.9-.72-2.53-.72-2.53Z" style="fill:#f3b721"/><path d="M5.8,5l2.77-.38,1.28-.71,1.44.42,2.29-.13L14.36,3l1.15.19,2.79-.26.76-.84,1.09-.73,1.53.23.56-.08A15.55,15.55,0,0,0,3.57,5.67h0ZM16.26,1.55,17.85.67l1,.6L17.39,2.39,16,2.54l-.64-.42Zm-4.72.13.7.29.92-.29.5.87-2.12.56-1-.6s1-.64,1-.83Z" style="fill:#f3b721"/></svg>&nbsp;&nbsp;<span class="site"> <a href="' + website + '"> google maps </a><span></div>');
  }

  //adding address
  $(".bottom").append('<div class="location"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 21.67 31.46"><title>Asset 3</title><path d="M21.16,7.83a9.22,9.22,0,0,0-.51-1.26A10.56,10.56,0,0,0,10.69,0,10.6,10.6,0,0,0,0,9.76V11.1c0,.06,0,.56.05.81C.44,15,2.91,18.37,4.76,21.5c2,3.36,4,6.66,6.08,10,1.26-2.15,2.52-4.34,3.74-6.43.34-.62.73-1.23,1.06-1.82.23-.39.66-.78.85-1.15,2-3.63,5.18-7.29,5.18-10.9V9.68a10.64,10.64,0,0,0-.51-1.85ZM10.78,14.57a3.86,3.86,0,0,1-3.69-2.63A3.71,3.71,0,0,1,7,11v-.87A3.64,3.64,0,0,1,10.9,6.51a4,4,0,0,1,4,4,4.06,4.06,0,0,1-4.08,4Z" style="fill:#f3b721"/></svg>&nbsp;&nbsp;</i><span class="address">' + address + '<span></div>');

  $(".bottom").append("<hr>");
  
  //adding infractions
  $(".bottom").append(' <div class="infraction">');
  for (let i = 0; i < fine.length; i++) {
    $(".infraction").append('<div class="finedate">Date of infraction<br><span class="date">' + fine_date[i] + '<span></div>');
    $(".infraction").append(' <div class="fineamount">Amount<br><span class="total">' + fine[i] + '<span></div>');

    $(".infraction").append('<div class="description">' + reason[i] + '</div>');
  }
  $(".bottom").append('</div>');

  //adding ratings
  $(".bottom").append("<hr>");
  $(".bottom").append('<div class="rating2"></div>');
  $(".bottom").append('<div class="stars2" id="dynamic-rating2"></div>');
  $(".bottom").append('<div class="reviewamount">' + reviews.length + ' Reviews</div>');
  
  for(let i = 0; i < reviews.length; i++) {
    $(".bottom").append('<div class="review">');
    
    $(".bottom").append(reviews[i].rating + "/5");
    $(".bottom").append('<div class="reviewname">' + reviews[i].author_name + '<span class="reviewdate"> - ' + reviews[i].relative_time_description + '<span></div>');
    $(".bottom").append('<div class="reviewdesc">' + reviews[i].text + '</div>');
    
    $(".bottom").append('</div>');
  }


  displayInfoPane();


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
    url: './Marker2.png',
    size: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
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
    let phone = data[key]['phone']; //this may be an empty string
    let website = data[key]['website']; //this may be an empty string
    let reviews = data[key]['reviews']; //this is an array
    let rating = data[key]['rating'];

    //creation of the marker
    var marker = new google.maps.Marker({
      position: { lat: vlat, lng: vlng },
      map: map,
      title: title,
      icon: image,
      shape: shape
    });
    marker.addListener('click', () => displayPlaceInfo(title, address, fine_date, fine, reason, phone, website, reviews, rating));
    markerMapData.push(marker);
  }

}


$.get('./data-grabber/maxed_data_fixed.json', (data) => populateMarkerMap(data), 'json');
