const {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  maxWidthImageRun,
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
  ShadingType,
} = require("docx");
const { generalStyles } = require("./config");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const sizeOf = require("image-size");

function createHeading(text, level = 0, isNumbered = true) {
  let heading, alignment;
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
  }

  return new Paragraph({
    children: [
      new TextRun({
        text: text,
      }),
    ],
    heading,
    alignment,
    numbering: isNumbered
      ? { reference: "heading-numbering", level }
      : undefined,
  });
}

function createTable(columns, data, tableAlt) {
  let item = [];

  item.push(
    new Paragraph({
      children: [
        new TextRun({
          text: tableAlt,
        }),
      ],
      heading: HeadingLevel.HEADING_5,
      numbering: {
        reference: "table-numbering",
        level: 0,
      },
    })
  );
  item.push(
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      margins: generalStyles.cellMargin,
      rows: [createTableRowHeader(columns), ...createTableRowsData(data)],
    })
  );

  return item;
}

function createTableRowHeader(data) {
  return new TableRow({
    children: [
      ...data.map((col) => {
        return new TableCell({
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
            fill: "#d9d9d9",
          },
        });
      }),
    ],
  });
}

function createTableRowsData(data) {
  let rows = [];
  for (let i = 0; i < data.length; i++) {
    rows.push(
      new TableRow({
        children: createTableCellsData(data[i]),
      })
    );
  }
  return rows;
}

function createTableCellsData(data) {
  let cells = [];
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    cells.push(
      new TableCell({
        children: [
          ...htmlToParagraphs(
            stringToHtml(data[`kolom${i + 1}`]),
            null,
            -1,
            true
          ),
        ],
      })
    );
  }
  return cells;
}

function createImageParagraph(imgPath, imgAlt) {
  let item = [];

  const imageBuffer = fs.readFileSync(imgPath);
  const dimensions = sizeOf(imageBuffer);

  // Assuming a standard page width of 8.5 inches (21.59 cm)
  // and default margins of 1 inch on each side
  const maxWidth = 6.5 * 72; // 6.5 inches in points (72 points per inch)

  let width = dimensions.width;
  let height = dimensions.height;

  if (width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height = height * ratio;
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
    })
  );
  item.push(
    new Paragraph({
      children: [
        new TextRun({
          text: imgAlt,
        }),
      ],
      heading: HeadingLevel.HEADING_6,
      numbering: {
        reference: "figure-numbering",
        level: 0,
      },
    })
  );
  item.push(new Paragraph(""));

  return item;
}

function stringToHtml(html) {
  if (html && !html.startsWith("<")) {
    html = `<p>${html}</p>`;
  }
  const dom = new JSDOM(`${html}`);
  return dom.window.document.body;
}

function htmlToParagraphs(
  html,
  numberingReference,
  level = -1,
  isTable = false
) {
  let paragraphs = [];
  const style = isTable ? "Table" : "Normal";

  for (let i = 0; i < html.childNodes.length; i++) {
    const el = html.childNodes[i];
    // const resetNumbering = el.getAttribute("data-reset-numbering") === "true";

    switch (el.nodeName.toLowerCase()) {
      case "p":
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
          })
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
      case "ol":
        paragraphs = paragraphs.concat(
          parseList(el, "basic-ordered-numbering", level + 1, isTable)
        );
        break;
      case "ul":
        paragraphs = paragraphs.concat(
          parseList(el, "basic-unordered-numbering", level + 1, isTable)
        );
        break;
    }
  }

  return paragraphs;
}

function parseNode(node) {
  let runs = [];

  node.childNodes.forEach((childNode) => {
    const childEl = childNode;
    const childText = childEl.nodeValue || childEl.textContent || "";

    switch (childEl.nodeName.toLowerCase()) {
      case "#text":
        runs.push(new TextRun({ text: childText }));
        break;
      case "strong":
        runs = runs.concat(parseNodeWithFormatting(childEl, { bold: true }));
        break;
      case "em":
        runs = runs.concat(parseNodeWithFormatting(childEl, { italics: true }));
        break;
      case "s":
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

function parseNodeWithFormatting(node, formatting) {
  let runs = [];

  node.childNodes.forEach((childNode) => {
    const childEl = childNode;
    const childText = childEl.nodeValue || childEl.textContent || "";

    switch (childEl.nodeName.toLowerCase()) {
      case "#text":
        runs.push(new TextRun({ text: childText, ...formatting }));
        break;
      case "strong":
        runs = runs.concat(
          parseNodeWithFormatting(childEl, { ...formatting, bold: true })
        );
        break;
      case "em":
        runs = runs.concat(
          parseNodeWithFormatting(childEl, { ...formatting, italics: true })
        );
        break;
      case "s":
        runs = runs.concat(
          parseNodeWithFormatting(childEl, { ...formatting, strike: true })
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

function parseList(node, numberingReference, level = 0, isTable = false) {
  let paragraphs = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    const listItem = node.childNodes[i];
    const childParagraphs = htmlToParagraphs(
      listItem,
      numberingReference,
      level,
      isTable
    );
    paragraphs = paragraphs.concat(childParagraphs);
  }

  return paragraphs;
}

module.exports = {
  createHeading,
  createTable,
  createTableRowHeader,
  createTableRowsData,
  createImageParagraph,
  stringToHtml,
  htmlToParagraphs,
};
