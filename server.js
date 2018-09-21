var express = require('express');
var app = express();

const { fork, spawn } = require('child_process');
const reportData = require('./reportDummyData');

app.listen(8080, function () {
    console.log('Listening on Port : 8080');
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

// uses spawn
app.get('/spawn', function (req, res) {
    var sortBy = req.query.sort;
    var reportName = 'report-' + new Date().getTime() + '.txt';
    const generate = spawn('node', ['./reportGenerationProcess.js', JSON.stringify(reportData), reportName, sortBy]);

    generate.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    generate.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    generate.on('exit', (code) => {
        if (code === 0) {
            console.log('report saved');
            res.send('report saved');
        } else {
            res.send('report failed');
        }
    });
});

// uses fork
app.get('/fork', function (req, res) {
    const sortBy = req.query.sort;
    const reportName = 'report-' + new Date().getTime() + '.txt';
    const generate = fork('./reportGeneratorFork.js');
    
    generate.send({ reportName, sortBy, reportData });
    
    generate.on('message', (message) => {
        res.send(message);
    });
});
