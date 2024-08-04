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
  Packer
} = require("docx");
const fs = require("fs");
const path = require("path");

const projectFolderPath = "/files/BCAS/deposito";
const jsonFilePath = path.join(__dirname, `${projectFolderPath}/data.json`);
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

const today = new Date();
const todayString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

const basicHeadingStyle = {
  run: {
    font: "Arial",
    size: 24,
    bold: true,
  },
  paragraph: {
    alignment: AlignmentType.LEFT,
    spacing: {
      line: 360, // 1.5 lines
    },
  },
};

const styles = {
  cellMargin: {
    left: 100,
    right: 100,
    top: 100,
    bottom: 100,
  },
  title: {
    run: {
      ...basicHeadingStyle.run,
      size: 32,
      allCaps: true,
    },
    paragraph: {
      ...basicHeadingStyle.paragraph,
      alignment: AlignmentType.CENTER,
    },
  },
  heading1: {
    run: {
      ...basicHeadingStyle.run,
      size: 28,
    },
    paragraph: {
      ...basicHeadingStyle.paragraph,
    },
  },
  heading2: basicHeadingStyle,
  normal: {
    run: {
      font: "Arial",
      size: 24,
    },
    paragraph: {
      alignment: AlignmentType.JUSTIFIED,
      spacing: {
        line: 360, // 1.5 lines
      },
    },
  },
};

const doc = new Document({
  styles: {
    paragraphStyles: [
      {
        id: "Normal",
        name: "Normal",
        basedOn: "Normal",
        next: "Normal",
        run: styles.normal.run,
        paragraph: styles.normal.paragraph,
        quickFormat: true,
      },
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        next: "Normal",
        run: styles.title.run,
        paragraph: styles.title.paragraph,
        quickFormat: true,
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: styles.heading1.run,
        paragraph: styles.heading1.paragraph,
        quickFormat: true,
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: styles.heading2.run,
        paragraph: styles.heading2.paragraph,
        quickFormat: true,
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        run: styles.heading2.run,
        paragraph: styles.heading2.paragraph,
        quickFormat: true,
      },
      {
        id: "Heading4",
        name: "Heading 4",
        basedOn: "Normal",
        next: "Normal",
        run: styles.heading2.run,
        paragraph: styles.heading2.paragraph,
        quickFormat: true,
      },
      {
        id: "Heading5",
        name: "Heading 5",
        basedOn: "Normal",
        next: "Normal",
        run: styles.normal.run,
        paragraph: styles.normal.paragraph,
        quickFormat: true,
      },
      {
        id: "Heading6",
        name: "Heading 6",
        basedOn: "Normal",
        next: "Normal",
        run: styles.normal.run,
        paragraph: {
          ...styles.normal.paragraph,
          alignment: AlignmentType.CENTER,
        },
        quickFormat: true,
      },
      {
        id: "DaftarIsi",
        name: "Daftar Isi",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: styles.normal.run,
        paragraph: {
          spacing: {
            line: 240,
          },
        },
      },
      {
        id: "DaftarTabelGambar",
        name: "Daftar Tabel dan Gambar",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: styles.normal.run,
        paragraph: {
          spacing: {
            line: 240,
          },
          indent: {
            left: 0,
            hanging: 0,
          },
        },
      },
    ],
  },
  features: {
    updateFields: true,
  },
  numbering: {
    config: [
      {
        reference: "heading-numbering",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 0, hanging: 0 },
              },
            },
          },
          {
            level: 1,
            format: LevelFormat.DECIMAL,
            text: "%1.%2",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 0, hanging: 0 },
              },
            },
          },
          {
            level: 2,
            format: LevelFormat.DECIMAL,
            text: "%1.%2.%3",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 0, hanging: 0 },
              },
            },
          },
          {
            level: 3,
            format: LevelFormat.DECIMAL,
            text: "%1.%2.%3.%4",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 0, hanging: 0 },
              },
            },
          },
        ],
      },
      {
        reference: "table-numbering",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "Tabel %1.",
            alignment: AlignmentType.START,
          },
        ],
      },
      {
        reference: "figure-numbering",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "Gambar %1.",
            alignment: AlignmentType.START,
          },
        ],
      },
      {
        reference: "basic-ordered-numbering",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 },
              },
            },
          },
          {
            level: 1,
            format: LevelFormat.LOWER_LETTER,
            text: "%2.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 1080, hanging: 360 },
              },
            },
          },
          {
            level: 2,
            format: LevelFormat.LOWER_ROMAN,
            text: "%3.",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 1440, hanging: 360 },
              },
            },
          },
        ],
      },
      {
        reference: "basic-unordered-numbering",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 },
              },
            },
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "◦",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 1080, hanging: 360 },
              },
            },
          },
          {
            level: 2,
            format: LevelFormat.BULLET,
            text: "▪",
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: { left: 1440, hanging: 360 },
              },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      // Cover page
      properties: {
        type: "nextPage",
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
              text: `${jsonData.swName}`,
            }),
            new TextRun({
              break: 2,
            }),
            new TextRun({
              text: `${jsonData.moduleName}`,
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
                path.join(__dirname, `${projectFolderPath}${jsonData.clientLogoPath}`),
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
                path.join(__dirname, "files/images/logo-isi.png"),
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
          children: [
          ],
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
                  margins: styles.cellMargin,
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
                  margins: styles.cellMargin,
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
                          text: `${jsonData.docNumber}`,
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                  columnSpan: 2,
                  margins: styles.cellMargin,
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
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [new TextRun(`${jsonData.docVersion}`)],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  verticalAlign: "center",
                  children: [
                    new Paragraph({
                      children: [new TextRun(`${todayString}`)],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
              ],
            }),
          ],
        }),
      ],
    },
    {
      // Daftar Perubahan
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
                                path.join(__dirname, `files/images/logo-isi.png`),
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
                              text: `${jsonData.docNumber}`,
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
                      margins: styles.cellMargin,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      },
      properties: {
        type: "nextPage",
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Daftar Perubahan",
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph(""),
        new Table({
          alignment: AlignmentType.CENTER,
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
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
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Disetujui oleh",
                          bold: true,
                        }),
                      ],
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Tanggal",
                          bold: true,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Ringkasan Perubahan",
                          bold: true,
                        }),
                      ],
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun(`${jsonData.docVersion}`)],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun("")],
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun(`${todayString}`)],
                      alignment: AlignmentType.CENTER,
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun("Perilisan pertama.")],
                      spacing: { line: 240 },
                    }),
                  ],
                  margins: styles.cellMargin,
                }),
              ],
            }),
          ],
        }),
      ],
    },
  ],
});

// Generate and save document
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("My Document.docx", buffer);
});
