# docx-math-converter

![npm version](https://img.shields.io/npm/v/@seewo-doc/docx-math-converter)

Converting LaTeX, MathML, or OMML strings to math objects using docx.js. Works for Node and on the Browser.

## API

### convertMathMl2Math

```js
import { convertMathMl2Math } from 'docx-math-converter';

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
```

### convertOmml2Math

```js
import { convertOmml2Math } from 'docx-math-converter';

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
```

### convertLatex2Math

```js
import { mathJaxReady, convertLatex2Math } from 'docx-math-converter';

await mathJaxReady();
const mathObj = convertLatex2Math('(a\\pm b)^2=a^2\\pm2ab+b^2');
```


## required

NodeJS version

```
"node": ">=16.17.0"
```

Installing docx dependence require:
```
"docx": "^8.5.0"
```

## Use

```js
const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            mathObj, // include mathObj
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
```
