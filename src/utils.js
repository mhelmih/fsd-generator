function createTableRowHeader(data) {
  return new TableRow({
    children: [
      ...data.map((col) => {
        return new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun(col)],
            }),
          ],
        });
      }),
    ],
  });
}

async function createTableRowsData(data) {
  let rows = [];
  for (let i = 0; i < data.length; i++) {
    rows.push(
      new TableRow({
        children: await createTableCellsData(data[i]),
      })
    );
  }
  return rows;
}

async function createTableCellsData(data) {
  let cells = [];
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    cells.push(
      new TableCell({
        children: [
          ...(await htmlToParagraphs(stringToHtml(data[`kolom${i + 1}`]))),
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
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body;
}
