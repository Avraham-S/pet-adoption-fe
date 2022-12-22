const fs = require("fs");
const path = require("path");

function createComponentFiles(componentName) {
  const dirPath = `./src/Components/${componentName}`;
  const boilerplate = `import React from 'react'
  import './${componentName}.css'
  
  export const ${componentName} = () => {
    return (
      <div>${componentName}</div>
      )
    }`;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  fs.appendFileSync(path.join(dirPath, `${componentName}.jsx`), boilerplate);
  fs.appendFileSync(path.join(dirPath, `${componentName}.css`), "");
}

for (let i = 2; i < process.argv.length; i++) {
  createComponentFiles(process.argv[i]);
}

/////////////////////////////
// setStateInfo({...prevState, [e.target.id]: e.target.value})
