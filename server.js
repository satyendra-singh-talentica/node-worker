var express = require('express');
var app = express();

var reportGenerator = require('./reportGenerator');

app.listen(8080, function () {
    console.log('Listening on Port : 8080');
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/generateReport', function (req, res) {
    res.send('request accepted');
    var sort = req.query.sort;
    var reportName = 'report-' + new Date().getTime() + '.txt';

    reportGenerator(reportName, sort).then(success => {
        if (success) {
            console.log('report generated');
        } else {
            console.log('report failed');
        }
    }).catch(err => {
        console.log('report failed');
    });
});
