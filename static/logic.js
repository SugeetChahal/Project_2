// Store our API endpoint inside queryUrl
var queryUrl = "https://ui-lodes-job-change-public.s3.amazonaws.com/sum_job_loss_county.geojson"
console.log("Hi");
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});


// // Define a markerSize function that will give each city a different radius based on its cordinate
// function markerSize(state_name) {
//   return state_name / 50;
// }

// // Each city object contains the city's name, location and population
// var state= [
//   {
//     name: "Alabama",
//     coordinates: [ -86.146225, 33.702176],
//     "max": 750.0
//   },
//   {
//     name: "Alaska",
//     coordinates: [179.48246426294082, 51.982841979897614 ],
//     "max": 100.0,
//   },
//   {
//     name: "Arizona",
//     coordinates: [ -113.334161, 35.528037 ],
//     "max": 2000.0,
//   },
//   {
//     name: "Arkansas",
//     coordinate: [ -93.075071, 34.801271 ],
//     "max": 750.0,
//   },
//   {
//     name: "California",
//     coordinates: [-123.891874, 40.001538 ],
//     "max": 2000.0,
//   }
// ];

// // Loop through the cities array and create one marker for each state object
// for (var i = 0; i < state.length; i++) {
//   L.circle(state.coordinates, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(state[i].max)
//   }).bindPopup("<h1>" + state[i].name + "</h1> <hr> <h3>coordinates: " + state[i].max+ "</h3>").addTo(myMap);
// }

// function chooseColor(lodes_job_change_public) {
//   if (lodes_job_change_public=== "Van Buren County") {
//     color = "black"
//   }
//   else {
//     color = "white"
//   }
//   return color;
// };

// function getColor(county_name) {
//   return county_name > 1000 ? '#800026' :
//          county_name > 500  ? '#BD0026' :
//          county_name> 200  ? '#E31A1C' :
//          county_name > 100  ? '#FC4E2A' :
//          county_name > 50   ? '#FD8D3C' :
//          county_name > 20   ? '#FEB24C' :
//          county_name > 10   ? '#FED976' :
//                     '#FFEDA0';
// }
// console.log();

//function myStyle(feature) {
 // "fillColor" = chooseColor(feature.properties.state_name),
//}

function createFeatures(sum_job_loss_county) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function addDetails(feature, layer) {
    layer.bindPopup("<h3><a target='_blank' href='" + feature.properties.url +"'>Click here</a><hr> "+ feature.properties.county_name +
      "</h3><hr><p>" + (feature.properties.X000) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the job_change object
  // Run the onEachFeature function once for each piece of data in the array
  var jobCh = L.geoJSON(sum_job_loss_county, {
    onEachFeature: addDetails, 
    style: function(feature,layer) {
      return {
    //     fillcolor: chooseColor(feature.properties.lodes_job_change_public),
    //   weight: 1,
    //   opacity: 1,
    //     color: '',
    //     dashArray: '3',
    //     fillOpacity: 0.7
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

  // // Create a new choropleth layer
  // geojson = L.choropleth(featureCollection, {

  //   // Define what  property in the features to use
  //   valueProperty: "X000",

  //   // Set color scale
  //   scale: ["#ffffb2", "#b10026"],

  //   // Number of breaks in step range
  //   steps: 20,

  //   // q for quartile, e for equidistant, k for k-means
  //   state_name: "rate",
  //   style: {
  //     // Border color
  //     color: "#fff",
  //     weight: 1,
  //     fillOpacity: 0.5,
  //   }
  // })

  