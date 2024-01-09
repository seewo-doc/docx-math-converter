// @ts-ignore
import mathjax from 'mathjax';
import { formatXMLString } from './utils';
import { convertMathMl2Math } from './mathml2math';

let MathJax: any;
mathjax.init({ loader: {load: ['input/tex']} }).then((mathJax: any) => {
  MathJax = mathJax;
});

export function convertLatex2Math(latexString: string) {
  const mathMlString = latex2MathMl(latexString);
  return convertMathMl2Math(mathMlString);
}

function latex2MathMl(latexString: string) {
  if (typeof latexString !== 'string') {
    throw 'invalid params for latex2MathMl';
  }

  return MathJax.tex2mml(latexString);
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest

  describe('latex2MathMl', () => {
    test('latex2MathMl empty', async () => {
      const result = await latex2MathMl('');
      expect(formatXMLString(result)).toBe(formatXMLString(`
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
        </math>
      `));
    });

    test('latex2MathMl simple', async () => {
      const result = await latex2MathMl('1 + 1 = 2');
      expect(formatXMLString(result)).toBe(formatXMLString(`
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mn>1</mn>
          <mo>+</mo>
          <mn>1</mn>
          <mo>=</mo>
          <mn>2</mn>
        </math>
      `));
    });
  });
}