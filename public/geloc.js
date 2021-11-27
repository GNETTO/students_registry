function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(5.3499169086982725, -4.011131684699846),
    zoom: 5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

//alert('hello')