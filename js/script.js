var map;


/* Data points defined as a mixture of WeightedLocation and LatLng objects */
var heatMapData = [
{location: new google.maps.LatLng(45.5016889,-73.567256), weight: 2},
{location: new google.maps.LatLng(45.5016889,-73.567256), weight: 2},
{location: new google.maps.LatLng(45.7016889,-73.567256), weight: 1},
{location: new google.maps.LatLng(45.5016889,-73.567256), weight: 1},
{location: new google.maps.LatLng(45.5016889,-73.57256), weight: 5},
{location: new google.maps.LatLng(45.2016889,-73.567256), weight: 1},
{location: new google.maps.LatLng(45.5016889,-73.567256), weight: 1},
{location: new google.maps.LatLng(45.5016889,-73.567256), weight: 1},
{location: new google.maps.LatLng(45.5016889,-73.27256), weight: 10},
{location: new google.maps.LatLng(45.5016889,-73.567256), weight: 1}
];

var Montreal = new google.maps.LatLng( 45.5016889,-73.567256);

map = new google.maps.Map(document.getElementById('map'), {
center: new google.maps.LatLng( 45.5016889,-73.567256),
zoom: 14,
minZoom: 11,
maxZoom: 17,
styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

});

var heatmap = new google.maps.visualization.HeatmapLayer({
data: heatMapData
});
heatmap.setMap(map);