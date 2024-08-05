const { Document } = require("docx");
const { styles, numbering } = require("./config");
const { coverPage, daftarPerubahanPage } = require("./sections");

const generateDocx = (data) => {
  return new Document({
    styles,
    numbering,
    features: {
      updateFields: true,
    },
    sections: [
      coverPage(data),
      daftarPerubahanPage(data),
    ],
  });
};

module.exports = { generateDocx };
