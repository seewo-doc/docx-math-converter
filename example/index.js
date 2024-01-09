const { mathJaxReady, convertLatex2Math } = require('@seewo-doc/docx-math-converter');

async function test() {
  await mathJaxReady();
  const result = convertLatex2Math('1+1=2');
  console.log('result', result);
}

test();