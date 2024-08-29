const fs = require('fs');
const path = require('path');
const util = require('util');
const { mathJaxReady, convertLatex2Math } = require('../../dist/docx-math-converter.cjs.js');
const { Document, Paragraph, Packer } = require('@seewo-doc/docx');

async function test() {
  await mathJaxReady();
  global.MathJax.config.startup.document = '';
  const result = convertLatex2Math('\\frac{a}{b}=\\frac{a\\times m}{b\\times m}');
  console.log('result', util.inspect(result, { depth: 10 }));

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