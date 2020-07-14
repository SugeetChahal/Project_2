//
// var getCovid = jQuery.get('/covidjson');
var getCovid = jQuery.get('/covidjson', {'id': 'cases'});

var myChart;
var states = [];
var cases = [];
var deaths = [];
var actives = [];
var recovered = [];

getCovid.done(function(data) {
    // console.log(data['0']["states"]);
    // console.log("'" + num + "'");
    // $(data).each(function() {
    //     console.log(this[0].states);
    //     for (i = 0; i < 51; i++) {
    //         states.push(this["'" + i + "'"]);
    //     }
    // })
    function getStates() {
        states.push(data['0'].states);
        states.push(data['1'].states);
        states.push(data['2'].states);
        states.push(data['3'].states);
        states.push(data['4'].states);
        states.push(data['5'].states);
        states.push(data['6'].states);
        states.push(data['7'].states);
        states.push(data['8'].states);
        states.push(data['9'].states);
        states.push(data['10'].states);
        states.push(data['11'].states);
        states.push(data['12'].states);
        states.push(data['13'].states);
        states.push(data['14'].states);
        states.push(data['15'].states);
        states.push(data['16'].states);
        states.push(data['17'].states);
        states.push(data['18'].states);
        states.push(data['19'].states);
        states.push(data['20'].states);
        states.push(data['21'].states);
        states.push(data['22'].states);
        states.push(data['23'].states);
        states.push(data['24'].states);
        states.push(data['25'].states);
        states.push(data['26'].states);
        states.push(data['27'].states);
        states.push(data['28'].states);
        states.push(data['29'].states);
        states.push(data['30'].states);
        states.push(data['31'].states);
        states.push(data['32'].states);
        states.push(data['33'].states);
        states.push(data['34'].states);
        states.push(data['35'].states);
        states.push(data['36'].states);
        states.push(data['37'].states);
        states.push(data['38'].states);
        states.push(data['39'].states);
        states.push(data['40'].states);
        states.push(data['41'].states);
        states.push(data['42'].states);
        states.push(data['43'].states);
        states.push(data['44'].states);
        states.push(data['45'].states);
        states.push(data['46'].states);
        states.push(data['47'].states);
        states.push(data['48'].states);
        states.push(data['49'].states);
        states.push(data['50'].states);
    };
    function getCases() {
        cases.push(data['0'].cases);
        cases.push(data['1'].cases);
        cases.push(data['2'].cases);
        cases.push(data['3'].cases);
        cases.push(data['4'].cases);
        cases.push(data['5'].cases);
        cases.push(data['6'].cases);
        cases.push(data['7'].cases);
        cases.push(data['8'].cases);
        cases.push(data['9'].cases);
        cases.push(data['10'].cases);
        cases.push(data['11'].cases);
        cases.push(data['12'].cases);
        cases.push(data['13'].cases);
        cases.push(data['14'].cases);
        cases.push(data['15'].cases);
        cases.push(data['16'].cases);
        cases.push(data['17'].cases);
        cases.push(data['18'].cases);
        cases.push(data['19'].cases);
        cases.push(data['20'].cases);
        cases.push(data['21'].cases);
        cases.push(data['22'].cases);
        cases.push(data['23'].cases);
        cases.push(data['24'].cases);
        cases.push(data['25'].cases);
        cases.push(data['26'].cases);
        cases.push(data['27'].cases);
        cases.push(data['28'].cases);
        cases.push(data['29'].cases);
        cases.push(data['30'].cases);
        cases.push(data['31'].cases);
        cases.push(data['32'].cases);
        cases.push(data['33'].cases);
        cases.push(data['34'].cases);
        cases.push(data['35'].cases);
        cases.push(data['36'].cases);
        cases.push(data['37'].cases);
        cases.push(data['38'].cases);
        cases.push(data['39'].cases);
        cases.push(data['40'].cases);
        cases.push(data['41'].cases);
        cases.push(data['42'].cases);
        cases.push(data['43'].cases);
        cases.push(data['44'].cases);
        cases.push(data['45'].cases);
        cases.push(data['46'].cases);
        cases.push(data['47'].cases);
        cases.push(data['48'].cases);
        cases.push(data['49'].cases);
        cases.push(data['50'].cases);
    };
    
    function getDeaths() {
        deaths.push(data['0'].deaths);
        deaths.push(data['1'].deaths);
        deaths.push(data['2'].deaths);
        deaths.push(data['3'].deaths);
        deaths.push(data['4'].deaths);
        deaths.push(data['5'].deaths);
        deaths.push(data['6'].deaths);
        deaths.push(data['7'].deaths);
        deaths.push(data['8'].deaths);
        deaths.push(data['9'].deaths);
        deaths.push(data['10'].deaths);
        deaths.push(data['11'].deaths);
        deaths.push(data['12'].deaths);
        deaths.push(data['13'].deaths);
        deaths.push(data['14'].deaths);
        deaths.push(data['15'].deaths);
        deaths.push(data['16'].deaths);
        deaths.push(data['17'].deaths);
        deaths.push(data['18'].deaths);
        deaths.push(data['19'].deaths);
        deaths.push(data['20'].deaths);
        deaths.push(data['21'].deaths);
        deaths.push(data['22'].deaths);
        deaths.push(data['23'].deaths);
        deaths.push(data['24'].deaths);
        deaths.push(data['25'].deaths);
        deaths.push(data['26'].deaths);
        deaths.push(data['27'].deaths);
        deaths.push(data['28'].deaths);
        deaths.push(data['29'].deaths);
        deaths.push(data['30'].deaths);
        deaths.push(data['31'].deaths);
        deaths.push(data['32'].deaths);
        deaths.push(data['33'].deaths);
        deaths.push(data['34'].deaths);
        deaths.push(data['35'].deaths);
        deaths.push(data['36'].deaths);
        deaths.push(data['37'].deaths);
        deaths.push(data['38'].deaths);
        deaths.push(data['39'].deaths);
        deaths.push(data['40'].deaths);
        deaths.push(data['41'].deaths);
        deaths.push(data['42'].deaths);
        deaths.push(data['43'].deaths);
        deaths.push(data['44'].deaths);
        deaths.push(data['45'].deaths);
        deaths.push(data['46'].deaths);
        deaths.push(data['47'].deaths);
        deaths.push(data['48'].deaths);
        deaths.push(data['49'].deaths);
        deaths.push(data['50'].deaths);
    };

    function getActives() {
        actives.push(data['0'].actives);
        actives.push(data['1'].actives);
        actives.push(data['2'].actives);
        actives.push(data['3'].actives);
        actives.push(data['4'].actives);
        actives.push(data['5'].actives);
        actives.push(data['6'].actives);
        actives.push(data['7'].actives);
        actives.push(data['8'].actives);
        actives.push(data['9'].actives);
        actives.push(data['10'].actives);
        actives.push(data['11'].actives);
        actives.push(data['12'].actives);
        actives.push(data['13'].actives);
        actives.push(data['14'].actives);
        actives.push(data['15'].actives);
        actives.push(data['16'].actives);
        actives.push(data['17'].actives);
        actives.push(data['18'].actives);
        actives.push(data['19'].actives);
        actives.push(data['20'].actives);
        actives.push(data['21'].actives);
        actives.push(data['22'].actives);
        actives.push(data['23'].actives);
        actives.push(data['24'].actives);
        actives.push(data['25'].actives);
        actives.push(data['26'].actives);
        actives.push(data['27'].actives);
        actives.push(data['28'].actives);
        actives.push(data['29'].actives);
        actives.push(data['30'].actives);
        actives.push(data['31'].actives);
        actives.push(data['32'].actives);
        actives.push(data['33'].actives);
        actives.push(data['34'].actives);
        actives.push(data['35'].actives);
        actives.push(data['36'].actives);
        actives.push(data['37'].actives);
        actives.push(data['38'].actives);
        actives.push(data['39'].actives);
        actives.push(data['40'].actives);
        actives.push(data['41'].actives);
        actives.push(data['42'].actives);
        actives.push(data['43'].actives);
        actives.push(data['44'].actives);
        actives.push(data['45'].actives);
        actives.push(data['46'].actives);
        actives.push(data['47'].actives);
        actives.push(data['48'].actives);
        actives.push(data['49'].actives);
        actives.push(data['50'].actives);

    };

    function getRecovered() {
        recovered.push(data['0'].recovered);
        recovered.push(data['1'].recovered);
        recovered.push(data['2'].recovered);
        recovered.push(data['3'].recovered);
        recovered.push(data['4'].recovered);
        recovered.push(data['5'].recovered);
        recovered.push(data['6'].recovered);
        recovered.push(data['7'].recovered);
        recovered.push(data['8'].recovered);
        recovered.push(data['9'].recovered);
        recovered.push(data['10'].recovered);
        recovered.push(data['11'].recovered);
        recovered.push(data['12'].recovered);
        recovered.push(data['13'].recovered);
        recovered.push(data['14'].recovered);
        recovered.push(data['15'].recovered);
        recovered.push(data['16'].recovered);
        recovered.push(data['17'].recovered);
        recovered.push(data['18'].recovered);
        recovered.push(data['19'].recovered);
        recovered.push(data['20'].recovered);
        recovered.push(data['21'].recovered);
        recovered.push(data['22'].recovered);
        recovered.push(data['23'].recovered);
        recovered.push(data['24'].recovered);
        recovered.push(data['25'].recovered);
        recovered.push(data['26'].recovered);
        recovered.push(data['27'].recovered);
        recovered.push(data['28'].recovered);
        recovered.push(data['29'].recovered);
        recovered.push(data['30'].recovered);
        recovered.push(data['31'].recovered);
        recovered.push(data['32'].recovered);
        recovered.push(data['33'].recovered);
        recovered.push(data['34'].recovered);
        recovered.push(data['35'].recovered);
        recovered.push(data['36'].recovered);
        recovered.push(data['37'].recovered);
        recovered.push(data['38'].recovered);
        recovered.push(data['39'].recovered);
        recovered.push(data['40'].recovered);
        recovered.push(data['41'].recovered);
        recovered.push(data['42'].recovered);
        recovered.push(data['43'].recovered);
        recovered.push(data['44'].recovered);
        recovered.push(data['45'].recovered);
        recovered.push(data['46'].recovered);
        recovered.push(data['47'].recovered);
        recovered.push(data['48'].recovered);
        recovered.push(data['49'].recovered);
        recovered.push(data['50'].recovered);
    };

    getStates();
    getCases();
    getDeaths();
    getActives();
    getRecovered();
    
    // console.log(states);
    // console.log(cases);
    // console.log(deaths);
    // console.log(actives);
    // console.log(recovered);
    console.log(states.slice(0,5))

    var data = {
        labels: [states],
        series: [cases, deaths],
    };

    var layout = {
        width: 600,
        height: 400
    }

    // myChart = new Chartist.Bar('#nemo', data, layout);
    myChart = new Chartist.Bar('#nemo', {
        // labels: [states],
        series: [
            cases,
            deaths,
            actives,
            recovered
        ]
    }, {
        stackBars: true,
        axisY: {
            labelInterpolationFnc: function(value) {
                return (value / 1000) + 'K';
            }
        },
        plugins: [
            Chartist.plugins.legend({
                legendNames: ['Cases (Red)', 'Deaths (Pink)', 'Active Cases (Yellow)', 'Recovered Cases (Brown)']
            })
        ]
    })
});

    // var toolTip = new CanvasJS.Chart('#nemo', {
    //     title: {
    //         text: "COVID in the US"
    //     }
    // });
    // toolTip.render();
// });