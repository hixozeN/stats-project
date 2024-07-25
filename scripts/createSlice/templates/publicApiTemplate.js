module.exports = (
  componentName,
  schemaName,
) => `export { ${componentName} } from './ui/${componentName}/${componentName}';
export { ${schemaName} } from './model/types/${schemaName}';
`;
