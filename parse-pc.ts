const fs = require('fs');
const inputFileName = './data/pc-list.csv';
const data = fs.readFileSync(inputFileName, { encoding: 'utf8', flag:'r' });
// Remove header row
const rows = data.split('\n').slice(1);
const htmlBlocks = rows.map(row => {
    let extractRegex = /("[^"]*"),[^,]*,([^,]*)/;
    let results = row.match(extractRegex);
    if (results.length < 3) { throw new Error(); }
    let reversedName = results[1];
    let affiliation = results[2].replaceAll('"', '');
    let name = reversedName.replaceAll('"', '')
                           .split(',')
                           .reverse()
                           .join(' ')
                           .trim();
    return (
        '<tr>\n' +
        `    <td>${name}</td>\n` +
        `    <td>${affiliation}</td>\n` +
        '</tr>\n'
    );
});
const html = htmlBlocks.join('');
console.log(html);
