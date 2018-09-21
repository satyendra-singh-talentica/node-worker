var fs = require('fs');

process.on('message', (params) => {
    generateReport(params);
});

function generateReport(params) {
    const sortedData = getSortedData(params.reportData, params.sortBy);
    fs.writeFile(params.reportName, JSON.stringify(sortedData, null, 4), function (err) {
        if (err) {
            process.send('report failed');
        } else {
            console.log('report saved');
            process.send('report saved');
        }
    });
}

function getSortedData(reportData, sortBy) {
    let sortedData;
    switch (sortBy) {
        case 'lastname':
            sortedData = reportData.sort(function (a, b) { return b.lastname < a.lastname; });
            break;
        case 'email':
            sortedData = reportData.sort(function (a, b) { return b.email < a.email; });
            break;
        case 'phone':
            sortedData = reportData.sort(function (a, b) { return b.phone < a.phone; });
            break;
        default:
            sortedData = reportData.sort(function (a, b) { return b.firstname < a.firstname; });
    }
    return sortedData;
}
