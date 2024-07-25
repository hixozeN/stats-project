const fs = require('fs/promises');
const firstCharUpperCase = require('../firstCharUpperCase');
const resolvePath = require('../resolvePath');
const publicApiTemplate = require('./publicApiTemplate');

module.exports = async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName);
  const schemaName = `${componentName}Schema`;

  try {
    await fs.writeFile(
      resolvePath('src', layer, sliceName, 'index.ts'),
      publicApiTemplate(componentName, schemaName),
    );
  } catch (e) {
    throw new Error('Ошибка при создании паблик апи: ', e);
  }
};
