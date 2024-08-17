const path = require('path');
const fs = require('fs');

const {
  AlignmentType,
  Footer,
  HeadingLevel,
  ImageRun,
  PageNumber,
  Paragraph,
  StyleLevel,
  Table,
  TableCell,
  TableOfContents,
  TableRow,
  TextRun,
  WidthType,
  SectionType,
} = require('docx');

const { generalStyles } = require('./config');
const {
  createVerticalTable,
  createHeading,
  htmlToParagraphs,
  stringToHtml,
  createImageParagraph,
  createHorizontalTable,
} = require('./utils');

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
          text: 'FUNCTIONAL SPECIFICATION DOCUMENT',
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
            path.join(`${data.projectFolderPath}${data.clientLogoPath}`),
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
          text: 'Dipersiapkan oleh',
          size: 28,
        }),
        new TextRun({
          break: 2,
        }),
        new ImageRun({
          data: fs.readFileSync(
            path.join(__dirname, '../files/images/logo-isi.png'),
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
          text: 'PT Ihsan Solusi Informatika',
          size: 28,
        }),
        new TextRun({
          break: 1,
        }),
        new TextRun({
          text: 'Jl. PHH Mustofa No. 39',
          size: 28,
        }),
        new TextRun({
          break: 1,
        }),
        new TextRun({
          text: 'Ruko Surapati Core C-7 Bandung',
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
              verticalAlign: 'center',
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Nomor Dokumen',
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
              verticalAlign: 'center',
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Halaman',
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
              verticalAlign: 'center',
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
              verticalAlign: 'center',
              children: [
                new Paragraph({
                  children: [new TextRun('1/<#>')],
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
              verticalAlign: 'center',
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Versi',
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
              verticalAlign: 'center',
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
              verticalAlign: 'center',
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
                  verticalAlign: 'center',
                  children: [
                    new Paragraph({
                      children: [
                        new ImageRun({
                          data: fs.readFileSync(
                            path.join(__dirname, '../files/images/logo-isi.png'),
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
                  verticalAlign: 'center',
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
                  verticalAlign: 'center',
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          children: [
                            'Halaman ',
                            PageNumber.CURRENT,
                            ' / ',
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
                  verticalAlign: 'center',
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Template dokumen ini dan informasi yang dimilikinya adalah milik PT Ihsan Solusi Informatika dan bersifat rahasia. Dilarang mereproduksi dokumen ini tanpa diketahui oleh PT Ihsan Solusi Informatika.',
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
    createHeading('Daftar Perubahan', 0, false),
    new Paragraph(''),
    ...createVerticalTable(
      data.daftarPerubahanCol,
      data.daftarPerubahanData,
      'Daftar Perubahan',
    ).slice(1),
  ],
});

/**
 * Halaman Daftar Isi
 */
const daftarIsiPage = {
  properties: {
    type: 'nextPage',
  },
  children: [
    createHeading('Daftar Isi', 0, false),
    new Paragraph(''),
    new TableOfContents('Daftar Isi', {
      hyperlink: true,
      headingStyleRange: '1-4',
      stylesWithLevels: [
        new StyleLevel('TOC1', 1),
        new StyleLevel('TOC2', 2),
        new StyleLevel('TOC2', 3),
        new StyleLevel('TOC2', 4),
      ],
    }),
  ],
};

/**
 * Halaman Daftar Tabel
 */
const daftarTabelPage = {
  properties: {
    type: 'nextPage',
  },
  children: [
    createHeading('Daftar Tabel', 0, false),
    new Paragraph(''),
    new TableOfContents('Daftar Gambar', {
      hyperlink: true,
      headingStyleRange: '5-5',
      stylesWithLevels: [new StyleLevel('DaftarTabelGambar', 1)],
    }),
  ],
};

/**
 * Halaman Daftar Gambar
 */
const daftarGambarPage = {
  properties: {
    type: 'nextPage',
  },
  children: [
    createHeading('Daftar Gambar', 0, false),
    new Paragraph(''),
    new TableOfContents('Daftar Gambar', {
      hyperlink: true,
      headingStyleRange: '6-6',
      stylesWithLevels: [new StyleLevel('DaftarTabelGambar', 1)],
    }),
  ],
};

/**
 * Convert sections from JSON to docx format
 *
 * @param {Object} data - All data from the JSON file
 * @param {Object} data.metadata - Metadata of the document
 * @param {string} data.metadata.projectFolderPath - Path to the project folder
 * @param {string} data.metadata.swName - Name of the software
 * @param {string} data.metadata.moduleName - Name of the module
 * @param {string} data.metadata.clientLogoPath - Path to the client logo
 * @param {string} data.metadata.docNumber - Document number
 * @param {string} data.metadata.docVersion - Document version
 * @param {string} data.metadata.docLatestUpdateDate - Document latest update date
 * @param {Array<string>} data.metadata.daftarPerubahanCol - Columns for the Daftar Perubahan table
 * @param {Array<Object>} data.metadata.daftarPerubahanData - Data for the Daftar Perubahan table
 * @param {Array<Object>} data.sections - Sections of the document
 * @param {Object} data.sections.properties - Properties of the section
 * @param {Array<Object>} data.sections.children - Children of the section
 * @param {string} data.sections.children.type - Type of the child element (heading, paragraph, htable, vtable, image, spacing)
 * @param {string} data.sections.children.content - Content of the child element
 * @param {Object} data.sections.children.properties - Properties of the child element
 * @returns {Array<Object>} - Sections in docx format
 *
 * @example
 * const data = {
 *  metadata: {
 *   projectFolderPath: '/path/to/project/folder',
 *   swName: 'Software Name',
 *   moduleName: 'Module Name',
 *   clientLogoPath: '/path/to/client/logo',
 *   docNumber: 'Document Number',
 *   docVersion: 'Document Version',
 *   docLatestUpdateDate: 'Document Latest Update Date',
 *   daftarPerubahanCol: ["Versi","Tanggal","Direview oleh","Disetujui oleh","Ringkasan Perubahan"],
 *   daftarPerubahanData: [{"kolom1": "1.0.0","kolom2": "11/07/2024","kolom3": "Muhammad Helmi Hibatullah","kolom4": "Rendi Resmawandi","kolom5": "Perilisan pertama."}],
 *  },
 *  sections: [
 *  {
 *   properties: {type: "section"},
 *   children: [
 *    {type: "heading", content: "Judul", properties: {level: 1, isNumbered: false}},
 *    {type: "paragraph", content: "Paragraf pertama."},
 *    {type: "htable", content: {table: [{"header": "Header1", "data": "data1"}], caption: "Caption"}, properties: {isPlain: false}},
 *    {type: "vtable", content: {header: ["Header1"], data: [["data1"]], caption: "Caption"}},
 *    {type: "image", content: {src: "/path/to/image", caption: "Caption"}},
 *    {type: "spacing"}
 *   ],
 *  },
 * ]};
 *
 * const sections = sectionConverter(data);
 */
const sectionConverter = (data) => {
  const sections = [
    coverPage(data.metadata),
    daftarPerubahanPage(data.metadata),
    daftarIsiPage,
    daftarTabelPage,
    daftarGambarPage,
  ];

  for (let i = 0; i < data.sections.length; i++) {
    const item = data.sections[i];
    const section = {
      properties: {
        type: item.properties.type,
      },
      children: [],
    };

    for (let j = 0; j < item.children.length; j++) {
      const child = item.children[j];

      if (child.type === 'heading') {
        section.children.push(
          createHeading(
            child.content,
            child.properties.level,
            child.properties.isNumbered,
          ),
        );
      } else if (child.type === 'paragraph') {
        section.children.push(...htmlToParagraphs(stringToHtml(child.content)));
      } else if (child.type === 'htable') {
        section.children.push(
          ...createHorizontalTable(
            child.content.table,
            child.properties.isPlain,
            child.content.caption,
          ),
        );
      } else if (child.type === 'vtable') {
        section.children.push(
          ...createVerticalTable(
            child.content.header,
            child.content.data,
            child.content.caption,
          ),
        );
      } else if (child.type === 'image') {
        section.children.push(
          ...createImageParagraph(
            data.metadata.projectFolderPath,
            child.content.src,
            child.content.caption,
          ),
        );
      } else if (child.type === 'spacing') {
        section.children.push(new Paragraph(''));
      }
    }

    sections.push(section);
  }

  return sections;
};

module.exports = {
  sectionConverter,
};
