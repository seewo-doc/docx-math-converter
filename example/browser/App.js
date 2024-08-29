import ReactJson from 'react-json-view'
import { useEffect, useState } from 'react';
import { mathJaxReady, convertMathMl2Math, convertOmml2Math, convertLatex2Math } from '../../dist/docx-math-converter.esm.js';
import './style.css';

function JSONDisplay({ jsonString }) {
  return (
    <ReactJson
      src={jsonString}
      theme="bright:inverted"
      displayDataTypes={false}
      displayObjectSize={false}
      collapsed={3}
    />
  );
}

export default function App() {
  const [mathMlInput, setMathMlInput] = useState(
    `<math display="block">
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
    </math>`
  );
  const [mathMl2MathResult, setMathMl2MathResult] = useState();

  const [ommlInput, setOmmlInput] = useState(
    `<m:oMath xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
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
    </m:oMath>`
  );
  const [omml2MathResult, setOmml2MathResult] = useState();

  const [latexInput, setLatexInput] = useState('\\lim_{x\\rightarrow\\infty}(1+\\frac{1}{x})^x=e');
  const [latex2MathResult, setLatex2MathResult] = useState();

  useEffect(() => {
    mathJaxReady();
  }, []);

  const handleMathMlInputChange = (event) => {
    setMathMlInput(event.target.value);
  };

  const handleMathMl2Math = () => {
    const result = convertMathMl2Math(mathMlInput);
    setMathMl2MathResult(result);
  };

  const handleOmmlInputChange = (event) => {
    setOmmlInput(event.target.value);
  };

  const handleOmml2Math = () => {
    const result = convertOmml2Math(ommlInput);
    setOmml2MathResult(result);
  };

  const handleLatexInputChange = (event) => {
    setLatexInput(event.target.value);
  };

  const handleLatex2Math = () => {
    console.log(latexInput)
    const result = convertLatex2Math(latexInput);
    console.log(result)
    setLatex2MathResult(result);
  };

  return (
    <div>
      <div className="convert-item-wrapper">
        <h1>convertMathMl2Math</h1>
        <div>
          <h3>input mathMl:</h3>
          <textarea
            className="math-input"
            rows={3}
            value={mathMlInput}
            onChange={handleMathMlInputChange}
          />
          <div className="convert-btn-wrapper">
            <button onClick={handleMathMl2Math}>convert</button>
          </div>
          <h3>docx math object result:</h3>
          <div className="result-wrapper">
            <JSONDisplay jsonString={mathMl2MathResult} />
          </div>
        </div>
      </div>

      <div className="convert-item-wrapper">
        <h1>convertOmml2Math</h1>
        <div>
          <h3>input Omml:</h3>
          <textarea
            className="math-input"
            rows={3}
            value={ommlInput}
            onChange={handleOmmlInputChange}
          />
          <div className="convert-btn-wrapper">
            <button onClick={handleOmml2Math}>convert</button>
          </div>
          <h3>docx math object result:</h3>
          <div className="result-wrapper">
            <JSONDisplay jsonString={omml2MathResult} />
          </div>
        </div>
      </div>

      <div className="convert-item-wrapper">
        <h1>convertLatex2Math</h1>
        <div>
          <h3>input latex:</h3>
          <textarea
            className="math-input"
            rows={3}
            value={latexInput}
            onChange={handleLatexInputChange}
          />
          <div className="convert-btn-wrapper">
            <button onClick={handleLatex2Math}>convert</button>
          </div>
          <h3>docx math object result:</h3>
          <div className="result-wrapper">
            <JSONDisplay jsonString={latex2MathResult} />
          </div>
        </div>
      </div>
    </div>
  );
}