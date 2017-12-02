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
    $('#nav-trigger').siblings('label').html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
  }
  else {
    $('#side').removeClass('side2');
    $('#map').removeClass('map2');
    $('#toggle').removeClass('toggle_container2');
    $('#nav').removeClass('nav2');
    $('#nav-trigger').siblings('label').html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
  }
}
