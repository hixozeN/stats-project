const fs = require('fs/promises');
const resolvePath = require('../resolvePath');
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = async (layer, sliceName) => {
  const layers = {
    features: 'Фича',
    entities: 'Сущность',
    pages: 'Страница',
  };

  try {
    await fs.writeFile(
      resolvePath('src', layer, sliceName, 'README.md'),
      `# ${layers[layer]} ${firstCharUpperCase(sliceName)}
      
      # Описание работы
      
      # Важные моменты
      `,
    );
  } catch (e) {
    throw new Error('Не удалось создать файл документации: ', e);
  }
};
