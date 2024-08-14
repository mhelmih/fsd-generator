# FSD Generator

FSD Generator is a script that generates a Functional Specification Document (FSD) in docx format from a JSON file using `docx.js` package. The JSON file should contain the following structure:

```json
{
  "swName": "BCA SYARIAH MODIL TRANSAKSI",
  "moduleName": "SETOR TUNAI",
  "clientLogoPath": "/images/logo-bcas.png",
  "docNumber": "FSD-BCAS-TRANSAKSI-02",
  "docVersion": "1.0.0",
  "docLatestUpdateDate": "11/07/2024",
  ...
}
// please refer to files/BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json for the complete structure
```

The script will generate a docx file with the following structure:

1. Halaman Cover
2. Daftar Perubahan
3. Daftar Isi
4. Pendahuluan
   - Tujuan
   - Lingkup
   - Definisi dan Istilah
   - Aturan Penamaan dan Penomoran
   - Ikhtisar Dokumen
5. Ringkasan Sistem
   - Arsitektur Sistem
   - Karakteristik Pengguna
6. Deskripsi Kebutuhan
   - Functional Specification
   - Transaction Flow
   - Skenario
   - UI Design
   - Field Description

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
  "swName": "BCA SYARIAH MODIL TRANSAKSI",
  "moduleName": "SETOR TUNAI",
  "clientLogoPath": "/images/logo-bcas.png",
  "docNumber": "FSD-BCAS-TRANSAKSI-02",
  "docVersion": "1.0.0",
  "docLatestUpdateDate": "11/07/2024",
  ...
}
// please refer to files/BCAS/transaksi/FSD-BCAS-TRANSAKSI-02.json for the complete structure
```

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
3. Neat and clean formatting.

## Known Issues

1. Can not put the total page count outside the footer. The docx.js package does not support this feature. Because of this, the total page count in `Halaman Cover` needs to be updated manually after the document is generated.
2. The table of content style is not working properly. Because of this, Daftar Tabel and Daftar Gambar indentation are a bit off.
3. The ordered numbering reset is not working properly. Because of this, any ordered list in the document will continue the numbering from the previous list. To fix this, the numbering needs to be updated manually after the document is generated. To make things easier, just use unordered list instead of ordered list.
4. The JSON file structure is rigid, making it hard to customize the document structure. The JSON file structure is also not validated. The script will throw an error if the JSON file structure is not correct. Because of this issue, if you want to customize the document structure, you need to modify the script.

## Future Improvements

1. Change the json file structure to be more flexible and change how the script reads the json file to make it more customizable.
