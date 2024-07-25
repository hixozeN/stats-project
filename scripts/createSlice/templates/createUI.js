const fs = require('fs/promises');
const resolvePath = require('../resolvePath');
const firstCharUpperCase = require('../firstCharUpperCase');
const storyTemplate = require('./storyTemplate');
const componentTemplate = require('./componentTemplate');
const styleTemplate = require('./styleTemplate');

module.exports = async (layer, sliceName) => {
  const resolveUIPath = (...segments) => resolvePath('src', layer, sliceName, 'ui', ...segments);

  const createUIDirectory = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log('Ошибка при создании директории UI: ', e);
    }
  };

  const createComponent = async () => {
    try {
      // Форматируем название компонента
      const componentName = firstCharUpperCase(sliceName);

      // создаем директорию и файлы компонента (компонент, стили, сторисы)
      await fs.mkdir(resolveUIPath(componentName));

      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(layer, componentName),
      );
    } catch (e) {
      throw new Error('Ошибка при создании компонента: ', e);
    }
  };

  await createUIDirectory();
  await createComponent();
};
