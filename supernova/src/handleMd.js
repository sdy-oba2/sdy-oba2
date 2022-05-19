const fs = require('fs');
const path = require('path');
const { patternProperties, patternTitle } = require('../templates');

const docgen = require("react-docgen-typescript");

module.exports.handleMd = (item) => {
  const data = docgen.parse(`${process.env.COMPONENT_PATH}/${item}`, {
    savePropValueAsString: true
  })

  const content = [
    patternTitle(data[0].displayName),
    patternProperties(data[0].props)
  ].join('\n');


  fs.writeFileSync(`${process.env.DOCUSAURUS_PATH}/${data[0].displayName}.md`, content)
}

module.exports.scanComponent = () => {
  console.log('scanComponent:')
  const files = fs.readdirSync(process.env.COMPONENT_PATH)

  files.forEach((fileName) => {
    const filePath = path.join(process.env.COMPONENT_PATH, fileName);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      console.log('FileName:', fileName)
      handleMd(`${fileName}/index.tsx`)
    }
  })
}
