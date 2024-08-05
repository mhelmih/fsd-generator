const { AlignmentType, LevelFormat } = require("docx");

/**
 * General heading style configuration
 */
const generalHeadingStyle = {
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

/**
 * General document styling configuration
 */
const generalStyles = {
  cellMargin: {
    left: 100,
    right: 100,
    top: 100,
    bottom: 100,
  },
  title: {
    run: {
      ...generalHeadingStyle.run,
      size: 32,
      allCaps: true,
    },
    paragraph: {
      ...generalHeadingStyle.paragraph,
      alignment: AlignmentType.CENTER,
    },
  },
  heading1: {
    run: {
      ...generalHeadingStyle.run,
      size: 28,
    },
    paragraph: {
      ...generalHeadingStyle.paragraph,
    },
  },
  heading2: generalHeadingStyle,
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

/**
 * Document styling configuration
 */
const styles = {
  paragraphStyles: [
    {
      id: "Normal",
      name: "Normal",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.normal.run,
      paragraph: generalStyles.normal.paragraph,
      quickFormat: true,
    },
    {
      id: "Table",
      name: "Table",
      basedOn: "Normal",
      next: "Normal",
      run: { ...generalStyles.normal.run, size: 20 },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          line: 240,
        },
      },
      quickFormat: true,
    },
    {
      id: "Title",
      name: "Title",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.title.run,
      paragraph: generalStyles.title.paragraph,
      quickFormat: true,
    },
    {
      id: "Heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.heading1.run,
      paragraph: generalStyles.heading1.paragraph,
      quickFormat: true,
    },
    {
      id: "Heading2",
      name: "Heading 2",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.heading2.run,
      paragraph: generalStyles.heading2.paragraph,
      quickFormat: true,
    },
    {
      id: "Heading3",
      name: "Heading 3",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.heading2.run,
      paragraph: generalStyles.heading2.paragraph,
      quickFormat: true,
    },
    {
      id: "Heading4",
      name: "Heading 4",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.heading2.run,
      paragraph: generalStyles.heading2.paragraph,
      quickFormat: true,
    },
    {
      id: "Heading5",
      name: "Heading 5",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.normal.run,
      paragraph: generalStyles.normal.paragraph,
      quickFormat: true,
    },
    {
      id: "Heading6",
      name: "Heading 6",
      basedOn: "Normal",
      next: "Normal",
      run: generalStyles.normal.run,
      paragraph: {
        ...generalStyles.normal.paragraph,
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
      run: generalStyles.normal.run,
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
      run: generalStyles.normal.run,
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
};

/**
 * Document numbering configuration
 */
const numbering = {
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
};

module.exports = {
  generalStyles,
  styles,
  numbering,
};
