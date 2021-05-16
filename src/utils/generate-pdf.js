const pdfMakePrinter = require('pdfmake/src/printer');
const fontDescriptor = require('../fonts/font-descriptor');

module.exports = (docDefinition, callback) => {
    try {
        const printer = new pdfMakePrinter(fontDescriptor);
        const doc = printer.createPdfKitDocument(docDefinition);

        let chunks = [];

        doc.on('data', (chunk) => chunks.push(chunk));

        doc.on('end', () => {
            const result = Buffer.concat(chunks);
            callback(result.toString('base64'));
        });

        doc.end();
    } catch (error) {
        throw error;
    }
};
