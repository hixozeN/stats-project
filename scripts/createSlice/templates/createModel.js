const fs = require('fs/promises');
const resolvePath = require('../resolvePath');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = async (layer, sliceName) => {
  // получение пути до конкретного сегмента слайса (типа, слайса, селекторов и т.д.)
  const resolveModelPath = (...segments) => resolvePath('src', layer, sliceName, 'model', ...segments);

  // функция создания структуры модели
  const createModelStructure = async () => {
    try {
      // создаем саму папку model и все её содержимое
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('types'));
      await fs.mkdir(resolveModelPath('slices'));
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
    } catch (e) {
      throw new Error(`Не удалось создать model для слайса ${sliceName}: `, e);
    }
  };

  // функция создания редакс-слайса
  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('slices', `${sliceName}Slice.ts`),
        reduxSliceTemplate(sliceName),
      );
    } catch (e) {
      throw new Error('Не удалось создать редакс слайс: ', e);
    }
  };

  // функция создания типизации редакс-слайса
  const createSliceSchema = async () => {
    try {
      const schemaName = firstCharUpperCase(sliceName);
      await fs.writeFile(
        resolveModelPath('types', `${schemaName}Schema.ts`),
        schemaTypeTemplate(schemaName),
      );
    } catch (e) {
      throw new Error('Не удалось создать интерфейс схемы слайса: ', e);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSliceSchema();
};
