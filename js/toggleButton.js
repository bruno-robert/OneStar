/*global $*/
function toggle() {
  if (document.getElementById('cb5').checked) {
    $.get('./data-grabber/data_complete.json', (data) => populateHeatMap(data));
  }
  else {

    $.get('./data-grabber/data_complete.json', (data) => populateMarkerMap(data));
  }
}



function nav() {
  if (document.getElementById('nav-trigger').checked) {
    $('#side').addClass('side2');
    $('#map').addClass('map2');
    $('#toggle').addClass('toggle_container2');
    $('#nav').addClass('nav2');
    $('#nav-trigger').siblings('label').html('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 34.04 59.72"><title>Asset 5</title><path d="M1.22,26.9,26.9,1.22a4.19,4.19,0,0,1,5.92,5.92L10.1,29.86,32.82,52.58a4.18,4.18,0,0,1-5.92,5.91L1.22,32.81a4.19,4.19,0,0,1,0-5.91Z"/></svg>');
  }
  else {
    $('#side').removeClass('side2');
    $('#map').removeClass('map2');
    $('#toggle').removeClass('toggle_container2');
    $('#nav').removeClass('nav2');
    $('#nav-trigger').siblings('label').html('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 34.04 59.72"><title>Asset 5</title><path d="M32.82,32.82,7.14,58.5a4.19,4.19,0,0,1-5.92-5.92L23.94,29.86,1.23,7.14A4.18,4.18,0,0,1,7.14,1.23L32.82,26.91a4.19,4.19,0,0,1,0,5.91Z"/></svg>');
  }
}
