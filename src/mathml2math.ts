// @ts-ignore
import { mml2omml } from 'mathml2omml';
import { formatXMLString } from './utils';
import { convertOmml2Math } from './omml2math';

export function convertMathMl2Math(mathMlString: string) {
  const ommlString = convertMathMl2Omml(mathMlString);
  return convertOmml2Math(ommlString);
}

function convertMathMl2Omml(mml: string) {
  const ommlString = mml2omml(mml);
  return ommlString;
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest

  describe('convertMathMl2Ooml', () => {
    test('convertMathMl2Ooml simple', async () => {
      const ommlString = await convertMathMl2Omml(`
        <math>
          <mrow>
            <mn>1</mn>
            <mo>+</mo>
            <mn>1</mn>
            <mo>=</mo>
            <mn>2</mn>
          </mrow>
        </math>
      `);

      expect(formatXMLString(ommlString)).toBe(formatXMLString(`
        <m:oMath xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
          <m:r>
            <m:t xml:space="preserve">1+1=2</m:t>
          </m:r>
        </m:oMath>
      `));
    });
  });
}