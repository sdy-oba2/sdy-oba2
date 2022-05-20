import doctrine from 'doctrine';

export const formatTag = (tag) => {
  delete tag.title;
  if (!tag.type) return tag;
  let formattedType = doctrine.type.stringify(tag.type);
  if (tag.type.type === doctrine.type.Syntax.TypeApplication) {
    formattedType = formattedType.replace('.<', '<');
  }
  if (tag.type.type === doctrine.type.Syntax.OptionalType) {
    formattedType = formattedType.replace('=', '?');
  }
  tag.type = formattedType;

  return tag;
}

export const extractDataRegex = (doc, doclets, filePath, unwrap = true) => {
  const commentsAst = doctrine.parse(doc.trim(), { unwrap, recoverable: true, sloppy: true });
  if (!commentsAst) return;

  const args = [];
  let description = commentsAst.description;
  let returns = {};
  let isStatic = false;
  let access = 'public';
  const examples = [];
  const properties = [];
  let name = '';
  let render = '';

  commentsAst.tags.forEach((tag) => {
    switch (tag.title) {
      case 'desc':
      case 'description':
        description = tag.description;
        break;
      case 'name':
        name = tag.name;
        break;
      case 'param':
      case 'arg':
      case 'argument':
        // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
        args.push(formatTag(tag));
        break;
      case 'returns':
      case 'return':
        returns = formatTag(tag);
        break;
      case 'static':
        isStatic = true;
        break;
      case 'private':
      case 'protected':
        access = tag.title;
        break;
      case 'access':
        access = tag.access;
        break;
      case 'property':
        // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
        properties.push(formatTag(tag));
        break;
      case 'render':
        render = tag.description;
        break;
      default:
        break;
    }
  });

  const doclet = {
    name,
    filePath,
    args,
    returns,
    access,
    examples,
    render,
    properties,
    description,
    static: isStatic,
  };

  doclets.push(doclet);
}
