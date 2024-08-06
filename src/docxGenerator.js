const { Document } = require("docx");
const { styles, numbering } = require("./config");
const {
  coverPage,
  daftarPerubahanPage,
  daftarIsiPage,
  pendahuluanPage,
} = require("./sections");

const generateDocx = (data) => {
  return new Document({
    styles,
    numbering,
    // features: {
    //   updateFields: true,
    // },
    sections: [
      coverPage(data),
      daftarPerubahanPage(data),
      daftarIsiPage,
      pendahuluanPage(data),
    ],
  });
};

module.exports = { generateDocx };
