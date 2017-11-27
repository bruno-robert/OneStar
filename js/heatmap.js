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
    zoom: 13,
    mapTypeId: 'satellite'
  });

  let heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });
  heatmap.set('opacity', .8);
  heatmap.set('radius', 20);
  heatmap.set('maxIntensity', 5);
  heatmap.setMap(map);

}

$.get('./data-grabber/data_complete.json', (data) => populateMap(data));
