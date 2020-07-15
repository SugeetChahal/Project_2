// Store our API endpoint inside queryUrl
var queryUrl = "https://ui-lodes-job-change-public.s3.amazonaws.com/sum_job_loss_county.geojson"
console.log("Hi");
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});
function chooseColor(jobs) {
   var color;
  if (jobs > 1000) {
    color = "green"
  } else if(jobs > 500) {
    color = "blue"
  }
  else {
    color = "red"
  }
  return color;
};
function createFeatures(sum_job_loss_county) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function addDetails(feature, layer) {
    layer.bindPopup( feature.properties.county_name +
      "</h3><hr><p> Number of Unemployment: " + (feature.properties.X000) + "</p>");
  }
  // Create a GeoJSON layer containing the features array on the job_change object
  // Run the onEachFeature function once for each piece of data in the array
  var jobCh = L.geoJSON(sum_job_loss_county, {
    onEachFeature: addDetails, 
    style: function(feature,layer) {
      return {
        color: chooseColor(feature.properties.X000),
      weight: 1,
      opacity: 1,
        dashArray: '3',
        fillOpacity: 0.7
      }
    }
  });
  // Sending our sum job loss county layer to the createMap function
  createMap(jobCh);
}
function createMap(sum_job_loss_county) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    sum_job_loss: sum_job_loss_county
  };
  // Create our map, giving it the streetmap and  layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, sum_job_loss_county]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);}
  