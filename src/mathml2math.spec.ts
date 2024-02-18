import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun } from '@seewo-doc/docx';
import { describe, test, expect } from 'vitest';
import { convertMathMl2Math } from './mathml2math';

describe('convertMathMl2Math', () => {
  test('createDocx', async () => {
    try {
      const mathObj = convertMathMl2Math(`
        <math display="block">
          <mrow>
            <mfrac>
              <mi>a</mi>
              <mi>b</mi>
            </mfrac>
            <mo>=</mo>
            <mfrac>
              <mrow>
                <mi>a</mi>
                <mo>×</mo>
                <mi>m</mi>
              </mrow>
              <mrow>
                <mi>b</mi>
                <mo>×</mo>
                <mi>m</mi>
              </mrow>
            </mfrac>
          </mrow>
        </math>
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

      fs.writeFileSync(path.resolve(process.cwd(), '.temp/mathml2math.docx'), buffer, { flag: 'w' }); 
      expect('x').toMatch('x');
    } catch (error) {
      console.error(error);
      expect('x').toMatch('y'); 
    }  
  });
});