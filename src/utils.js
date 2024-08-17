const path = require('path');
const fs = require('fs');

const { JSDOM } = require('jsdom');
const {
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  ShadingType,
} = require('docx');
const sizeOf = require('image-size');

const { generalStyles } = require('./config');

/**
 * Create a heading paragraph
 *
 * @param {string} text string to be converted to heading
 * @param {number} level level of the heading (0-4)
 * @param {boolean} isNumbered whether the heading is numbered or not
 * @returns {Paragraph} a paragraph object with the heading
 */
function createHeading(text, level = 0, isNumbered = true) {
  let heading;
  let alignment;
  switch (level) {
    case 0:
      heading = HeadingLevel.HEADING_1;
      if (isNumbered) {
        alignment = AlignmentType.LEFT;
      } else {
        alignment = AlignmentType.CENTER;
      }
      break;
    case 1:
      heading = HeadingLevel.HEADING_2;
      alignment = AlignmentType.LEFT;
      break;
    case 2:
      heading = HeadingLevel.HEADING_3;
      alignment = AlignmentType.LEFT;
      break;
    case 3:
      heading = HeadingLevel.HEADING_4;
      alignment = AlignmentType.LEFT;
      break;
    default:
      break;
  }

  return new Paragraph({
    children: [
      new TextRun({
        text,
      }),
    ],
    heading,
    alignment,
    numbering: isNumbered
      ? { reference: 'heading-numbering', level }
      : undefined,
  });
}

/**
 * Parse a node with formatting and return an array of text runs
 *
 * @param {HTMLElement} node html element to be parsed with formatting
 * @param {Object} formatting formatting of the text
 * @returns {Array<TextRun>} an array of text runs
 */
function parseNodeWithFormatting(node, formatting) {
  let runs = [];

  node.childNodes.forEach((childNode) => {
    const childEl = childNode;
    const childText = childEl.nodeValue || childEl.textContent || '';

    switch (childEl.nodeName.toLowerCase()) {
      case '#text':
        runs.push(new TextRun({ text: childText, ...formatting }));
        break;
      case 'strong':
        runs = runs.concat(
          parseNodeWithFormatting(childEl, { ...formatting, bold: true }),
        );
        break;
      case 'em':
        runs = runs.concat(
          parseNodeWithFormatting(childEl, { ...formatting, italics: true }),
        );
        break;
      case 's':
        runs = runs.concat(
          parseNodeWithFormatting(childEl, { ...formatting, strike: true }),
        );
        break;
      // Add other tags as needed
      default:
        if (childEl.childNodes.length > 0) {
          runs = runs.concat(parseNodeWithFormatting(childEl, formatting));
        }
        break;
    }
  });

  return runs;
}

/**
 * Parse a node and return an array of text runs. Does not handle formatting.
 *
 * @param {HTMLElement} node html element to be parsed
 * @returns {Array<TextRun>} an array of text runs
 */
function parseNode(node) {
  let runs = [];

  node.childNodes.forEach((childNode) => {
    const childEl = childNode;
    const childText = childEl.nodeValue || childEl.textContent || '';

    switch (childEl.nodeName.toLowerCase()) {
      case '#text':
        runs.push(new TextRun({ text: childText }));
        break;
      case 'strong':
        runs = runs.concat(parseNodeWithFormatting(childEl, { bold: true }));
        break;
      case 'em':
        runs = runs.concat(parseNodeWithFormatting(childEl, { italics: true }));
        break;
      case 's':
        runs = runs.concat(parseNodeWithFormatting(childEl, { strike: true }));
        break;
      // Add other tags as needed
      default:
        if (childEl.childNodes.length > 0) {
          runs = runs.concat(parseNode(childEl));
        }
        break;
    }
  });

  return runs;
}

/**
 * Parse a list node and return an array of paragraphs
 *
 * @param {HTMLElement} node html element to be parsed
 * @param {string} numberingReference reference for the numbering
 * @param {number} level level of the list
 * @param {boolean} isTable whether the list is inside a table
 * @returns {Array<Paragraph>} an array of paragraphs
 */
function parseList(node, numberingReference, level = 0, isTable = false) {
  let paragraphs = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    const listItem = node.childNodes[i];
    const childParagraphs = htmlToParagraphs(
      listItem,
      numberingReference,
      level,
      isTable,
    );
    paragraphs = paragraphs.concat(childParagraphs);
  }

  return paragraphs;
}

/**
 * Convert a string to an html element and return the body
 *
 * @param {string} text string to be converted to html
 * @returns {HTMLElement} an html element
 */
function stringToHtml(text) {
  let html = text;
  if (html && !html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }
  const dom = new JSDOM(`${html}`);
  return dom.window.document.body;
}

/**
 * Convert an html element to an array of paragraphs
 *
 * @param {HTMLElement} html html element to be converted
 * @param {string} numberingReference reference for the numbering
 * @param {number} level level of the list
 * @param {boolean} isTable whether the list is inside a table
 * @returns {Array<Paragraph>} an array of paragraphs
 */
function htmlToParagraphs(
  html,
  numberingReference,
  level = -1,
  isTable = false,
) {
  let paragraphs = [];
  const style = isTable ? 'Table' : 'Normal';

  for (let i = 0; i < html.childNodes.length; i++) {
    const el = html.childNodes[i];
    // const resetNumbering = el.getAttribute("data-reset-numbering") === "true";

    switch (el.nodeName.toLowerCase()) {
      case 'p':
        const runs = parseNode(el);
        paragraphs.push(
          new Paragraph({
            children: runs,
            numbering:
              numberingReference && i === 0
                ? {
                  reference: numberingReference,
                  level,
                  // instance: resetNumbering ? Math.random() : undefined,
                }
                : undefined,
            style,
          }),
        );
        break;
        // case "img":
        //   const src = el.getAttribute("src") as string;
        //   try {
        //     let base64: string;
        //     if (src.startsWith("data:")) {
        //       base64 = src;
        //     } else {
        //       base64 = await convertImageToBase64(src);
        //     }

        //     const { width, height } = (await getImageDimensions(base64)) as {
        //       width: number;
        //       height: number;
        //     };

        //     // Resize if the image is too big
        //     let newWidth = width;
        //     let newHeight = height;

        //     if (width > PAGE_WIDTH || height > PAGE_HEIGHT) {
        //       const widthRatio = PAGE_WIDTH / width;
        //       const heightRatio = PAGE_HEIGHT / height;
        //       const minRatio = Math.min(widthRatio, heightRatio);
        //       newWidth = width * minRatio;
        //       newHeight = height * minRatio;
        //     }

      //     const imageRun = new ImageRun({
      //       data: base64.split(",")[1], // Remove the "data:image/*;base64," prefix
      //       transformation: {
      //         width: newWidth,
      //         height: newHeight,
      //       },
      //     });
      //     paragraphs.push(
      //       new Paragraph({
      //         children: [imageRun],
      //         alignment: AlignmentType.CENTER,
      //       }),
      //       new Paragraph({
      //         children: [
      //           new TextRun({
      //             text: "<Deskripsi Gambar>",
      //           }),
      //         ],
      //         heading: HeadingLevel.HEADING_6,
      //         numbering: {
      //           reference: "figure-numbering",
      //           level: 0,
      //         },
      //       })
      //     );
      //   } catch (error) {
      //     console.error("Error getting image dimensions:", error);
      //   }
      //   break;
      case 'ol':
        paragraphs = paragraphs.concat(
          parseList(el, 'basic-ordered-numbering', level + 1, isTable),
        );
        break;
      case 'ul':
        paragraphs = paragraphs.concat(
          parseList(el, 'basic-unordered-numbering', level + 1, isTable),
        );
        break;
      default:
        break;
    }
  }

  return paragraphs;
}

/**
 * Create a table row for the table header
 *
 * @param {Array<string>} data array of column headers
 * @returns {TableRow} a table row object
 */
function createTableRowHeader(data) {
  return new TableRow({
    children: [
      ...data.map(
        (col) => new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: col,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { line: 240 },
            }),
          ],
          margins: generalStyles.cellMargin,
          shading: {
            type: ShadingType.CLEAR,
            fill: '#d9d9d9',
          },
        }),
      ),
    ],
  });
}

/**
 * Create table cells from the data
 *
 * @param {Object} data data for the cells
 * @param {string} data.kolom1 data for the first column
 * @param {string} data.kolom2 data for the second column
 * @param {string} data.kolom${i} data for the i-th column
 * @returns {Array<TableCell>} an array of table cells
 */
function createTableCellsData(data) {
  const cells = [];
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    cells.push(
      new TableCell({
        children: [
          ...htmlToParagraphs(
            stringToHtml(data[`kolom${i + 1}`]),
            null,
            -1,
            true,
          ),
        ],
      }),
    );
  }
  return cells;
}

/**
 * Create table rows from the data
 *
 * @param {Array<Object>} data data for the rows
 * @param {string} data.kolom1 data for the first column
 * @param {string} data.kolom2 data for the second column
 * @param {string} data.kolom${i} data for the i-th column
 * @returns {Array<TableRow>} an array of table rows
 */
function createTableRowsData(data) {
  const rows = [];
  for (let i = 0; i < data.length; i++) {
    rows.push(
      new TableRow({
        children: createTableCellsData(data[i]),
      }),
    );
  }
  return rows;
}

/**
 * Create a vertical table
 *
 * @param {Array<string>} columns array of column headers
 * @param {Array<Object>} data array of data for the table
 * @param {string} tableCaption caption for the table
 * @returns {Array<Paragraph>} an array of paragraphs
 */
function createVerticalTable(columns, data, tableCaption) {
  const item = [];

  item.push(
    new Paragraph({
      children: [
        new TextRun({
          text: tableCaption,
        }),
      ],
      heading: HeadingLevel.HEADING_5,
      numbering: {
        reference: 'table-numbering',
        level: 0,
      },
    }),
  );
  item.push(
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      margins: generalStyles.cellMargin,
      rows: [createTableRowHeader(columns), ...createTableRowsData(data)],
    }),
  );
  item.push(new Paragraph(''));

  return item;
}

/**
 * Create a horizontal table
 *
 * @param {Array<Object>} data array of data for the table
 * @param {string} data[].header header for the table
 * @param {string} data[].data data for the table
 * @param {boolean} isPlain whether the table is plain or not
 * @param {string} tableCaption caption for the table
 * @returns {Array<Paragraph>} an array of paragraphs
 */
function createHorizontalTable(data, isPlain = false, tableCaption = '') {
  const item = [];

  if (!isPlain) {
    item.push(
      new Paragraph({
        children: [
          new TextRun({
            text: tableCaption,
          }),
        ],
        heading: HeadingLevel.HEADING_5,
        numbering: {
          reference: 'table-numbering',
          level: 0,
        },
      }),
    );
  }
  item.push(
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      margins: generalStyles.cellMargin,
      rows: data.map(
        (row) => new TableRow({
          children: [
            new TableCell({
              children: [
                ...htmlToParagraphs(stringToHtml(row.header), null, -1, true),
              ],
              shading: isPlain
                ? undefined
                : {
                  type: ShadingType.CLEAR,
                  fill: '#d9d9d9',
                },
            }),
            new TableCell({
              children: [
                ...htmlToParagraphs(stringToHtml(row.data), null, -1, true),
              ],
            }),
          ],
        }),
      ),
      borders: isPlain
        ? {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        }
        : undefined,
    }),
  );
  item.push(new Paragraph(''));

  return item;
}

/**
 * Create a paragraph with an image
 *
 * @param {string} projectPath path to the project folder
 * @param {string} imgPath path to the image
 * @param {string} imgCaption caption for the image
 * @returns {Array<Paragraph>} an array of paragraphs
 */
function createImageParagraph(projectPath, imgPath, imgCaption) {
  const item = [];

  const imageBuffer = fs.readFileSync(path.join(projectPath, imgPath));
  const dimensions = sizeOf(imageBuffer);

  // Assuming a standard page width of 8.5 inches (21.59 cm)
  // and default margins of 1 inch on each side
  const maxWidth = 6.5 * 72; // 6.5 inches in points (72 points per inch)

  let { width } = dimensions;
  let { height } = dimensions;

  if (width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height *= ratio;
  }

  item.push(
    new Paragraph({
      children: [
        new ImageRun({
          data: imageBuffer,
          transformation: {
            width,
            height,
          },
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
  );
  item.push(
    new Paragraph({
      children: [
        new TextRun({
          text: imgCaption,
        }),
      ],
      heading: HeadingLevel.HEADING_6,
      numbering: {
        reference: 'figure-numbering',
        level: 0,
      },
    }),
  );
  item.push(new Paragraph(''));

  return item;
}

module.exports = {
  createHeading,
  htmlToParagraphs,
  stringToHtml,
  createHorizontalTable,
  createVerticalTable,
  createImageParagraph,
};
