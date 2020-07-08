var queryUrl = "http://127.0.0.1:5000/covid"

d3.json(queryUrl, function(data) {
    console.log(data)
});

// d3.json('http://127.0.0.1:5000/covid', function(error, data) {
//     console.log(data)
// });
