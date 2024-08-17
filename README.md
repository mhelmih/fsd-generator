# FSD Generator

FSD Generator is a script that generates a Functional Specification Document (FSD) in docx format from a JSON file using `docx.js` package. The JSON file should contain the following structure:

```json
{
  "metadata": {
    "swName": "BCA SYARIAH MODIL TRANSAKSI",
    "moduleName": "SETOR TUNAI",
    "clientLogoPath": "/images/logo-bcas.png",
    "docNumber": "FSD-BCAS-TRANSAKSI-02",
    "docVersion": "1.0.0",
    "docLatestUpdateDate": "11/07/2024",
    "daftarPerubahanCol": [
      "Versi",
      "Tanggal",
      "Direview oleh",
      "Disetujui oleh",
      "Ringkasan Perubahan"
    ],
    "daftarPerubahanData": [
      {
        "kolom1": "1.0.0",
        "kolom2": "11/07/2024",
        "kolom3": "Muhammad Helmi Hibatullah",
        "kolom4": "Rendi Resmawandi",
        "kolom5": "Perilisan pertama."
      }
    ]
  },
  "sections": [
    {
      "properties": {
        "type": "nextPage"
      },
      "children": [
        {
          "type": "heading",
          "properties": {
            "level": 0,
            "isNumbered": true
          },
          "content": "Pendahuluan"
        },
        {
          "type": "paragraph",
          "content": "Paragraph content"
        },
        {
          "type": "htable",
          "properties": {
            "isPlain": false
          },
          "content": {
            "table": [
              {
                "header": "header1",
                "data": "data1"
              },
              {
                "header": "header2",
                "data": "data2"
              }
            ]
          }
        },
        {
          "type": "vtable",
          "content": {
            "header": [
              "header1",
              "header2"
            ],
            "data": [
              {
                "kolom1": "data1",
                "kolom2": "data2"
              },
              {
                "kolom1": "data3",
                "kolom2": "data4"
              }
            ]
          }
        },
        {
          "type": "image",
          "content": {
            "src": "/images/logo-bcas.png",
            "caption": "Logo BCA Syariah"
          }
        },
        {
          "type": "spacing",
        }
      ]
    }
  ]
}
```
*please refer to [/files/BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json](/files/BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json) for the complete structure

The script will automatically generate a docx file with the following structure:

1. Halaman Cover
2. Daftar Perubahan
3. Daftar Isi
4. Daftar Tabel
5. Daftar Gambar
6. Sections based on the JSON file

## Installation

1. Clone this repository.
2. Install the required packages by running the following command:

```bash
npm install
```

## Usage

1. Create a new folder in the `files` directory with the following structure:

```bash
files
└── CLIENT_NAME
    └── MODULE_NAME
        └── images
        └── FSD-CLIENT-MODULE-01.json
```

example:

```bash
files
└── BCAS
    └── transaksi
        └── images
            └── logo-bcas.png
            └── arsitektur-sistem.png
            └── transaction-flow.png
            └── ui-setor-tunai.png 
        └── FSD-BCAS-TRANSAKSI-02.json
```

2. Create a JSON file with the following structure:

```json
{
  "metadata": {
    "swName": "BCA SYARIAH MODIL TRANSAKSI",
    "moduleName": "SETOR TUNAI",
    "clientLogoPath": "/images/logo-bcas.png",
    "docNumber": "FSD-BCAS-TRANSAKSI-02",
    "docVersion": "1.0.0",
    "docLatestUpdateDate": "11/07/2024",
    "daftarPerubahanCol": [
      "Versi",
      "Tanggal",
      "Direview oleh",
      "Disetujui oleh",
      "Ringkasan Perubahan"
    ],
    "daftarPerubahanData": [
      {
        "kolom1": "Doc Version",
        "kolom2": "Doc Latest Update Date",
        "kolom3": "Reviewed by",
        "kolom4": "Approved by",
        "kolom5": "Summary of Changes"
      }
    ]
  },
  "sections": []
}
```
*please refer to [/files/BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json](/files/BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json) for the complete structure

Every section in the document should be defined in the `sections` array. Every section would be separated by a page break. Each object in the `sections` array should have the following structure:

```json
{
  "properties": {
    "type": "nextPage"
  },
  "children": []
}
```

The `children` array should contain the content of the section. The content could be a heading, paragraph, table, image, or spacing. The structure of the content should be as follows:

```json
{
  "type": "heading",
  "properties": {
    "level": 0,
    "isNumbered": true
  },
  "content": "Pendahuluan"
}
```

```json
{
  "type": "paragraph",
  "content": "Paragraph content"
}
```

```json
{
  "type": "htable",
  "properties": {
    "isPlain": false
  },
  "content": {
    "table": [
      {
        "header": "header1",
        "data": "data1"
      },
      {
        "header": "header2",
        "data": "data2"
      }
    ]
  }
}
```

```json
{
  "type": "vtable",
  "content": {
    "header": [
      "header1",
      "header2"
    ],
    "data": [
      {
        "kolom1": "data1",
        "kolom2": "data2"
      },
      {
        "kolom1": "data3",
        "kolom2": "data4"
      }
    ]
  }
}
```

```json
{
  "type": "image",
  "content": {
    "src": "/images/logo-bcas.png",
    "caption": "Logo BCA Syariah"
  }
}
```

```json
{
  "type": "spacing",
}
```

If you want to add text formatting, use HTML tags in the JSON file. The script will automatically convert the HTML tags to text formatting. The supported HTML tags are `<em>`, `<strong>`, `<s>`, `<ol>`, `<ul>`, `<li>`. The script will ignore any other HTML tags.

If you want to add an image, put the image in the `images` directory inside the project folder and use the image path in the JSON file.

3. Run the following command:

```bash
node index.js /CLIENT_NAME/MODULE_NAME/FSD-CLIENT-MODULE-01.json
```

example:

```bash
node index.js /BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json
```

4. The script will generate a docx file in the same directory as the JSON file.
5. If you want to update an existing document, change the `docVersion` and `docLatestUpdateDate` in the JSON file and run the script again.

## Features

1. Generate a Functional Specification Document (FSD) in docx format from a JSON file.
2. Auto-generate Daftar Isi, Daftar Tabel, and Daftar Gambar.
3. Support for text formatting (bold, italic, strikethrough) and numbering using HTML tags in the JSON file (\<em>, \<strong>, \<s>, \<ol>, \<ul>, \<li>).
4. Flexible and customizable document structure.
5. Neat and clean formatting.

## Known Issues

1. Can not put the total page count outside the footer. The docx.js package does not support this feature. Because of this, the total page count in `Halaman Cover` needs to be updated manually after the document is generated.
2. The table of content style is not working properly. Because of this, Daftar Tabel and Daftar Gambar indentation are a bit off.
3. The ordered numbering reset is not working properly. Because of this, any ordered list in the document will continue the numbering from the previous list. To fix this, the numbering needs to be updated manually after the document is generated. To make things easier, just use unordered list instead of ordered list.

## Future Improvements

1. Add support for more text formatting (underline, subscript, superscript, etc.).
2. Add auto-generate JSON file content feature based on user input using AI.
