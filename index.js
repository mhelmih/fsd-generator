const fs = require("fs");
const path = require("path");
const { Packer } = require("docx");
const { generateDocx } = require("./src/docxGenerator");

const projectFolderPath = path.join(__dirname, "files/BCAS/deposito");
const jsonFilePath = path.join(
  `${projectFolderPath}/FSD-BCAS-DEPOSITO-01.json`
);
let jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
jsonData.projectFolderPath = projectFolderPath;

const doc = generateDocx(jsonData);

const outputPath = path.join(`${projectFolderPath}/FSD-BCAS-DEPOSITO-01.docx`);
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
});
