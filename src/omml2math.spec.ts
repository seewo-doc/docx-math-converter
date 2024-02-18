import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun } from '@seewo-doc/docx';
import { describe, test, expect } from 'vitest';
import { convertOmml2Math } from './omml2math';

describe('convertOmml2Math', () => {
  test('createDocx', async () => {
    try {
      const mathObj = convertOmml2Math(`
        <m:oMath xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
          <m:rad>
            <m:deg>
              <m:r>
                <m:t>3</m:t>
              </m:r>
            </m:deg>
            <m:e>
              <m:r>
                <m:t>1234</m:t>
              </m:r>
            </m:e>
          </m:rad>
        </m:oMath>
      `);
    
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun("Docx Math Converter"),
                ],
              }),
              new Paragraph({
                children: [
                  mathObj,
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

      fs.writeFileSync(path.resolve(process.cwd(), '.temp/omml2math.docx'), buffer, { flag: 'w' }); 
      expect('x').toMatch('x');
    } catch (error) {
      console.error(error);
      expect('x').toMatch('y'); 
    }  
  });
});