import doctrine from 'doctrine';
import * as reactDocs from 'react-docgen-typescript';
import { extractDataRegex } from './extract-data-regex';

export const formatProperties = (props) => {
  const descriptionParser = (description) => {
    // an extra step is needed to parse the properties description correctly. without this step
    // it'd show the entire tag, e.g. `@property {propTypes.string} text - Button text.`
    // instead of just `text - Button text.`.
    try {
      const descriptionAST = doctrine.parse(description, { unwrap: true, recoverable: true, sloppy: true });
      if (descriptionAST && descriptionAST.tags[0]) return descriptionAST.tags[0].description;
    } catch (err) {
      // failed to parse the react property, that's fine, it'll return the original description
    }
    return description;
  }

  return Object.keys(props).map((name) => {
    const { type, description, required, defaultValue, flowType, tsType } = props[name];

    return {
      name,
      required,
      defaultValue,
      description: descriptionParser(description),
      type: stringifyType(type || flowType || tsType),
    };
  });
}

export const formatMethods = (methods) => Object.entries(methods).map(({ returns, modifiers, params, docblock, name }) => ({
  name,
  params,
  returns,
  modifiers,
  description: docblock,
}));

export const fromReactDocs = ({ description, displayName, props, methods }, filePath) => ({
  filePath,
  name: displayName,
  description,
  properties: formatProperties(props),
  access: 'public',
  methods: formatMethods(methods),
})

export const stringifyType = (prop) => {
  if (!prop) return '?'; // TODO!

  const { name } = prop;
  let transformed;

  switch (name) {
    default:
      transformed = name;
      break;
    case 'func':
      transformed = 'function';
      break;
    case 'shape':
      transformed = JSON.stringify(
        Object.keys(prop.value).reduce((acc = {}, current) => {
          acc[current] = stringifyType(prop.value[current]);
          return acc;
        }, {})
      );
      break;
    case 'enum':
      transformed = prop.value.map((enumProp) => enumProp.value).join(' | ');
      break;
    case 'instanceOf':
      transformed = prop.value;
      break;
    case 'union':
      transformed = prop.value ? prop.value.map((p) => stringifyType(p)).join(' | ') : prop.raw;
      break;
    case 'arrayOf':
      transformed = `${stringifyType(prop.value)}[]`;
      break;
  }

  return transformed;
}

export default async function parse(data, filePath) {
  const doclets = [];
  try {
    const componentsInfo = reactDocs.parse(data, reactDocs.resolver.findAllExportedComponentDefinitions, undefined, {
      configFile: false,
      filename: filePath, // should we use pathNormalizeToLinux(filePath) ?
    });

    if (componentsInfo) {
      return componentsInfo.map((componentInfo) => {
        const formatted = fromReactDocs(componentInfo, filePath);
        formatted.args = [];
        extractDataRegex(formatted.description, doclets, filePath, false);
        formatted.description = doclets[0].description;
        formatted.examples = doclets[0].examples;
        return formatted;
      });
    }
  } catch (err) {
    logger.trace(`failed parsing docs using docgen on path ${filePath} with error`, err);
  }

  return undefined;
}
