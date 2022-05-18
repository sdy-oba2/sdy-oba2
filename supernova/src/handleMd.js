import fs from 'fs';
import path from 'path';
import { patternProperties, patternTitle } from "../templates";

const docgen = require("react-docgen-typescript");

export const handleMd = (item) => {
  const data = docgen.parse(`${process.env.COMPONENT_PATH}/${item}`, {
    savePropValueAsString: true
  })

  const content = [
    patternTitle(data[0].displayName),
    patternProperties(data[0].props)
  ].join('\n');


  fs.writeFileSync(`${process.env.DOCUSAURUS_PATH}/${data[0].displayName}.md`, content)
}

export const scanComponent = () => {
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
