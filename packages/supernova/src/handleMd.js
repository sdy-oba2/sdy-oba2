import fs from 'fs';
import path from 'path';
import {
  patternProperties,
  patternTitle,
  patternStory,
  patternComponentDescription,
} from '../templates/index.js';
import docgen from 'react-docgen-typescript';

export const handleMd = (item, readme, fileName) => {
  const data = docgen.parse(`${process.env.OBA_PATH}/components/${item}`, {
    savePropValueAsString: true,
  });

  let componentDescription = "";
  if (readme) {
    componentDescription = fs.readFileSync(
      `${process.env.OBA_PATH}/components/${readme}`
    );
  }

  const content = [
    patternTitle(data[0].displayName),
    componentDescription.length
      ? patternComponentDescription(componentDescription)
      : "",
    patternStory(fileName),
    patternProperties(data[0].props),
  ].join("\n");

  fs.writeFileSync(
    `${process.env.DOCUSAURUS_PATH}/components/${data[0].displayName}.mdx`,
    content
  );
};

export const scanComponent = () => {
  const DOCUSAURUS_PATH = process.env.OBA_PATH + "/components";

  console.log("scanComponent:" + DOCUSAURUS_PATH);
  const files = fs.readdirSync(DOCUSAURUS_PATH);

  files.forEach((fileName) => {
    const filePath = path.join(DOCUSAURUS_PATH, fileName);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      console.log("FileName:", fileName);
      const stat = fs.existsSync(`${filePath}/readme.md`);
      handleMd(
        `${fileName}/index.tsx`,
        stat ? `${fileName}/readme.md` : null,
        fileName
      );
    }
  });
};
