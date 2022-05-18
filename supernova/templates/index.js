export const patternProperties = (props) => `
## Props of component

| Name               | Type                                | Default value | Description              |
| ------------------ | ----------------------------------- | ------------- | ------------------------ |
${Object.entries(props).map(([key, item]) => (`| ${key}| ${(item.type || {}).name || ''}| ${(item.defaultValue || {}).value || ''}| ${item.description || ''}|`)).join('\n')}
`

export const patternTitle = (title, extra = '') => `---
title: ${title}
${extra}
---
`
