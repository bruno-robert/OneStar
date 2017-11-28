/*global $*/
function toggle() {
  if (document.getElementById('cb5').checked) {
    $.get('./data-grabber/data_complete.json', (data) => populateHeatMap(data));
  }
  else {

    $.get('./data-grabber/data_complete.json', (data) => populateMarkerMap(data));
  }
}
