import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun } from '@seewo-doc/docx';
import { describe, test, expect } from 'vitest';
import { convertLatex2Math, mathJaxReady } from './latex2math';

describe('convertLatex2Math', () => {
  test('createDocx', async () => {
    try {
      await mathJaxReady();
      const mathObj = convertLatex2Math('s=\\sqrt{\\frac{1}{n}\\left[(x_1-\\overline{x})^2+(x_2…verline{x})^2+\\cdots+(x_n-\\overline{x})^2\\right]}');
    
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

      fs.writeFileSync(path.resolve(process.cwd(), '.temp/latex2math.docx'), buffer, { flag: 'w' }); 
      expect('x').toMatch('x');
    } catch (error) {
      console.error(error);
      expect('x').toMatch('y'); 
    }  
  });
});