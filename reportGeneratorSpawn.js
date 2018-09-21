var fs = require('fs');
const reportData = JSON.parse(process.argv[2]);
const reportName = process.argv[3];
const sortBy = process.argv[4];

function generateReport() {
    const sortedData = getSortedData();
    fs.writeFile(reportName, JSON.stringify(sortedData, null, 4), function (err) {
        if (err) throw err;
        console.log('report saved');
    });
}

function getSortedData() {
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

generateReport();
