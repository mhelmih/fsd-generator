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
  ShadingType,
} = require("docx");
const { generalStyles } = require("./config");
const { JSDOM } = require("jsdom");

function createTable(columns, data) {
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    margins: generalStyles.cellMargin,
    rows: [createTableRowHeader(columns), ...createTableRowsData(data)],
  });
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

function stringToHtml(html) {
  if (html && !html.startsWith("<")) {
    html = `<p>${html}</p>`;
  }
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`);
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
    switch (el.nodeName.toLowerCase()) {
      case "p":
        const runs = parseNode(el);
        paragraphs.push(
          new Paragraph({
            children: runs,
            numbering:
              numberingReference && i === 0
                ? { reference: numberingReference, level }
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
          parseList(el, "basic-ordered-numbering", level + 1)
        );
        break;
      case "ul":
        paragraphs = paragraphs.concat(
          parseList(el, "basic-unordered-numbering", level + 1)
        );
        break;
    }
  }
  // if (html.nodeName.toLowerCase() !== "li") {
  //   paragraphs.push(new Paragraph(""));
  // }

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

function parseList(node, numberingReference, level = 0) {
  let paragraphs = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    const listItem = node.childNodes[i];
    const childParagraphs = htmlToParagraphs(
      listItem,
      numberingReference,
      level
    );
    paragraphs = paragraphs.concat(childParagraphs);
  }

  return paragraphs;
}

module.exports = {
  createTable,
  createTableRowHeader,
  createTableRowsData,
  stringToHtml,
  htmlToParagraphs,
};
