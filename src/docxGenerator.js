const { Document } = require("docx");
const { styles, numbering } = require("./config");
const {
  coverPage,
  daftarPerubahanPage,
  daftarIsiPage,
  pendahuluanPage,
  ringkasanSistemPage,
  deskripsiKebutuhanPage,
  daftarGambarPage,
  daftarTabelPage,
} = require("./sections");

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
      daftarIsiPage,
      daftarTabelPage,
      daftarGambarPage,
      pendahuluanPage(data),
      ringkasanSistemPage(data),
      deskripsiKebutuhanPage(data),
    ],
  });
};

module.exports = { generateDocx };
