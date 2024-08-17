const fs = require('fs');
const path = require('path');

const { Packer } = require('docx');

const { generateDocx } = require('./src/docxGenerator');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Please provide the path to the json file');
  process.exit(1);
}

const fullPath = args[0];
const projectFolderPath = path.join(__dirname, 'files', path.dirname(fullPath));
const jsonFilePath = path.join(__dirname, 'files', fullPath);

const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
jsonData.metadata.projectFolderPath = projectFolderPath;

const doc = generateDocx(jsonData);

const outputPath = path.join(`${projectFolderPath}/FSD-BCAS-TRANSAKSI-02.docx`);
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
});
console.log(`Document written to ${outputPath}`);
