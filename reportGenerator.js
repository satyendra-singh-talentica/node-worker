const spawn = require('child_process').spawn;
const reportData = require('./reportDummyData');

const reportGenerator = (reportName, sortBy) => {
    return new Promise((resolve, reject) => {
        
        const reportGenerationProcess = spawn('node', ['./reportGenerationProcess.js', JSON.stringify(reportData), reportName, sortBy]);
        
        reportGenerationProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        
        reportGenerationProcess.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        
        reportGenerationProcess.on('exit', (code) => {
            console.log('Report generation process terminated with code ' + code);
            if (code === 0) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
};

module.exports = reportGenerator;
