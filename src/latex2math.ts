// @ts-ignore
import mathjax from 'mathjax-full';
import { formatXMLString } from './utils';
import { convertMathMl2Math } from './mathml2math';

// https://github.com/mathjax/MathJax-demos-node/blob/master/preload/tex2mml
import 'mathjax-full/components/src/startup/lib/startup.js';
import 'mathjax-full/components/src/core/core.js';
import 'mathjax-full/components/src/adaptors/liteDOM/liteDOM.js';
import 'mathjax-full/components/src/input/tex-base/tex-base.js';
import 'mathjax-full/components/src/input/tex/extensions/all-packages/all-packages.js';
import 'mathjax-full/components/src/startup/startup.js';

// @ts-ignore
MathJax.loader.preLoad(
  'core',
  'adaptors/liteDOM',
  'input/tex-base',
  '[tex]/all-packages'
);

// @ts-ignore
MathJax.config.startup.ready();

export function convertLatex2Math(latexString: string) {
  const mathMlString = latex2MathMl(latexString);
  return convertMathMl2Math(mathMlString);
}

function latex2MathMl(latexString: string) {
  if (typeof latexString !== 'string') {
    throw 'invalid params for latex2MathMl';
  }

  // @ts-ignore
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