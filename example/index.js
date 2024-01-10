const fs = require('fs');
const path = require('path');
const { mathJaxReady, convertLatex2Math } = require('@seewo-doc/docx-math-converter');
const { Document, Paragraph, Packer } = require('docx');

async function test() {
  await mathJaxReady();
  global.MathJax.config.startup.document = '';
  const result = convertLatex2Math('1+1=2');
  console.log('result', result);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              result,
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const dirPath = path.resolve(process.cwd(), '.temp');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(path.resolve(dirPath, 'example.docx'), buffer);
}

test();