export const patternProperties = (props) => `
## Props of component

| Name               | Type                                | Default value | Description              |
| ------------------ | ----------------------------------- | ------------- | ------------------------ |
${Object.entries(props)
  .map(([key, item]) => {
    if (item?.type?.name && item.type.name.includes("|")) {
      item.type.name = item.type.name.replace("|", "");
    }
    return `| ${key}| ${(item.type || {}).name || ""}| ${
      (item.defaultValue || {}).value || ""
    }| ${item.description || ""}|`;
  })
  .join("\n")}
`;

export const patternTitle = (title, extra = "") => `---
title: ${title}
${extra}
---
`;

export const patternTokensColor = (props) => `
## Props of token

| Name               | Color                                |  Usage  |
| ------------------ | ----------------------------------- | -------- |
${Object.entries(props)
  .map(
    ([key, value]) =>
      `| ${key}| ${value}|     ![${value}](https://via.placeholder.com/15/${value.replace(
        "#",
        ""
      )}/000000?text=+)  |  `
  )
  .join("\n")}
`;

export const patternTokensTypography = (props) => `
## Props of token

| Name               |  Font Family | Font Style   | Font Weight | Font Size |
| ------------------ | ----------------------------------- | -------- |  ------------ |  ------------ |
${Object.entries(props)
  .map(
    ([key, value]) =>
      `${key}|  ${value.fontFamily}      |  ${value.fontStyle}  |     ${
        value.fontWeight
      } |    ${value[`fontSize.measure`]}  |`
  )
  .join("\n")}
`;

export const patternTokensGradients = (props) => `
## Props of token

| Name               |  type  |  color and position    |  
| ------------------ | ----------------------------------- | ----------------------------------- | 
${Object.entries(props)
  .map(
    ([key, value]) =>
      `${key}|  ${value.type}      |  ${value.stops
        .map(
          (item) =>
            ` Color : ${item.color}  ![${
              item.color
            }](https://via.placeholder.com/15/${item.color.replace(
              "#",
              ""
            )}/000000?text=+) ---- Position :   ${item.position}`
        )
        .join("<br />")}  |     `
  )
  .join("\n")}

  ## Usage 


  ${Object.entries(props)
    .map(([key, value]) => `${handleGradients(value.stops, key)} <br /> `)
    .join("\n")}

`;

export const patternComponentDescription = (props) => `
## Component description

${props}

`;

export const patternStory = (fileName) => `
## Stories

import Instance from '@yds/ui/dist/components/${fileName}/composition';

<Instance />
`;

const handleGradients = (gradiens, key) => {
  let arrayColor = [];
  gradiens.forEach((item) => {
    arrayColor.push(item.color);
  });

  var colors = arrayColor.join(",");

  return `<div
  style={{
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    widht: "200px",
    height : "50px",
    backgroundImage: "linear-gradient(to right, ${colors})",
  }}
>  ${key}
</div>`;
};
