const {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  PageNumber,
  Paragraph,
  StyleLevel,
  Table,
  TableCell,
  TableOfContents,
  TableRow,
  TextRun,
  WidthType,
  Packer,
  SectionType,
  BorderStyle,
} = require("docx");
const { generalStyles } = require("./config");
const path = require("path");
const fs = require("fs");
const {
  createTable,
  createHeading,
  htmlToParagraphs,
  stringToHtml,
} = require("./utils");

/**
 * Halaman Cover
 */
const coverPage = (data) => ({
  properties: {
    type: SectionType.NEXT_PAGE,
    titlePage: true,
  },
  children: [
    new Paragraph({
      children: [],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "FUNCTIONAL SPECIFICATION DOCUMENT",
        }),
        new TextRun({
          break: 2,
        }),
        new TextRun({
          text: `${data.swName}`,
        }),
        new TextRun({
          break: 2,
        }),
        new TextRun({
          text: `${data.moduleName}`,
        }),
      ],
      heading: HeadingLevel.TITLE,
    }),
    new Paragraph({
      children: [
        new TextRun({
          break: 3,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new ImageRun({
          data: fs.readFileSync(
            path.join(`${data.projectFolderPath}${data.clientLogoPath}`)
          ),
          transformation: {
            width: 330,
            height: 56,
          },
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({
          break: 3,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Dipersiapkan oleh",
          size: 28,
        }),
        new TextRun({
          break: 2,
        }),
        new ImageRun({
          data: fs.readFileSync(
            path.join(__dirname, "../files/images/logo-isi.png")
          ),
          transformation: {
            width: 345,
            height: 82,
          },
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "PT Ihsan Solusi Informatika",
          size: 28,
        }),
        new TextRun({
          break: 1,
        }),
        new TextRun({
          text: "Jl. PHH Mustofa No. 39",
          size: 28,
        }),
        new TextRun({
          break: 1,
        }),
        new TextRun({
          text: "Ruko Surapati Core C-7 Bandung",
          size: 28,
        }),
        new TextRun({
          break: 2,
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Nomor Dokumen",
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
              columnSpan: 2,
              margins: generalStyles.cellMargin,
            }),
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Halaman",
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
              margins: generalStyles.cellMargin,
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${data.docNumber}`,
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
              columnSpan: 2,
              margins: generalStyles.cellMargin,
            }),
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [new TextRun("1/<#>")],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Versi",
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
              margins: generalStyles.cellMargin,
            }),
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [new TextRun(`${data.docVersion}`)],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
              margins: generalStyles.cellMargin,
            }),
            new TableCell({
              verticalAlign: "center",
              children: [
                new Paragraph({
                  children: [new TextRun(`${data.docLatestUpdateDate}`)],
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 240 },
                }),
              ],
              margins: generalStyles.cellMargin,
            }),
          ],
        }),
      ],
    }),
  ],
});

/**
 * Halaman Daftar Perubahan
 */
const daftarPerubahanPage = (data) => ({
  footers: {
    default: new Footer({
      children: [
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [
                        new ImageRun({
                          data: fs.readFileSync(
                            path.join(__dirname, `../files/images/logo-isi.png`)
                          ),
                          transformation: {
                            width: 138,
                            height: 33,
                          },
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${data.docNumber}`,
                          bold: true,
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          children: [
                            "Halaman ",
                            PageNumber.CURRENT,
                            " / ",
                            PageNumber.TOTAL_PAGES,
                          ],
                          bold: true,
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  columnSpan: 3,
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Template dokumen ini dan informasi yang dimilikinya adalah milik PT Ihsan Solusi Informatika dan bersifat rahasia. Dilarang mereproduksi dokumen ini tanpa diketahui oleh PT Ihsan Solusi Informatika.",
                          size: 18,
                        }),
                      ],
                      spacing: {
                        line: 240,
                      },
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: generalStyles.cellMargin,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  },
  properties: {
    type: SectionType.NEXT_PAGE,
  },
  children: [
    createHeading("Daftar Perubahan", 0, false),
    new Paragraph(""),
    createTable(data.daftarPerubahanCol, data.daftarPerubahanData),
  ],
});

/**
 * Halaman Daftar Isi
 */
const daftarIsiPage = {
  properties: {
    type: "nextPage",
  },
  children: [
    createHeading("Daftar Isi", 0, false),
    new Paragraph(""),
    new TableOfContents("Daftar Isi", {
      hyperlink: true,
      headingStyleRange: "1-4",
      stylesWithLevels: [
        new StyleLevel("DaftarIsi", 1),
        new StyleLevel("DaftarIsi", 2),
        new StyleLevel("DaftarIsi", 3),
        new StyleLevel("DaftarIsi", 4),
      ],
    }),
  ],
};

/**
 * Halaman Pendahuluan
 */
const pendahuluanPage = (data) => ({
  properties: {
    type: "nextPage",
  },
  children: [
    createHeading("Pendahuluan", 0, true),
    createHeading("Tujuan Penulisan Dokumen", 1, true),
    ...htmlToParagraphs(stringToHtml(data.tujuanPenulisan)),
    new Paragraph(""),
    createHeading("Lingkup", 1, true),
    ...htmlToParagraphs(stringToHtml(data.lingkup)),
    new Paragraph(""),
    createHeading("Definisi dan Istilah", 1, true),
    ...htmlToParagraphs(stringToHtml(data.definisiIstilah.desc)),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      margins: generalStyles.cellMargin,
      rows: data.definisiIstilah.data.map((row) => {
        return new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun(row.term)],
                  spacing: { line: 240 },
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun(row.definition)],
                  spacing: { line: 240 },
                }),
              ],
            }),
          ],
        });
      }),
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
    }),
    new Paragraph(""),
    createHeading("Aturan Penamaan dan Penomoran", 1, true),
    ...htmlToParagraphs(stringToHtml(data.penamaanPenomoran.desc)),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      margins: generalStyles.cellMargin,
      rows: data.penamaanPenomoran.data.map((row) => {
        return new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun(row.numbering)],
                  spacing: { line: 240 },
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun(row.rule)],
                  spacing: { line: 240 },
                }),
              ],
            }),
          ],
        });
      }),
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
    }),
    new Paragraph(""),
    createHeading("Referensi", 1, true),
    ...htmlToParagraphs(stringToHtml(data.referensi)),
    new Paragraph(""),
    createHeading("Ikhtisar Dokumen", 1, true),
    ...htmlToParagraphs(stringToHtml(data.ikhtisarDokumen)),
    new Paragraph(""),
  ],
});

module.exports = {
  coverPage,
  daftarPerubahanPage,
  daftarIsiPage,
  pendahuluanPage,
};
