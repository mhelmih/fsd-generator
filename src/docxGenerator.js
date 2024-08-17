const { Document } = require('docx');

const { styles, numbering } = require('./config');
const { sectionConverter } = require('./sections');

/**
 * Generate a docx document
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
 * @returns {Document} - A docx document
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
 *    {type: "vtable", content: {header: ["Header1"], data: [{"kolom1":"data1"}], caption: "Caption"}},
 *    {type: "image", content: {src: "/path/to/image", caption: "Caption"}},
 *    {type: "spacing"}
 *   ],
 *  },
 * ]};
 *
 * const docx = generateDocx(data);
 */
const generateDocx = (data) => new Document({
  styles,
  numbering,
  features: {
    updateFields: true,
  },
  sections: [...sectionConverter(data)],
});

module.exports = { generateDocx };
