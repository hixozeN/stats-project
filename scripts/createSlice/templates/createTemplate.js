const fs = require('fs/promises');
const resolvePath = require('../resolvePath');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');
const createDocumentation = require('./createDocumentation');

module.exports = async (layer, sliceName) => {
  // пробуем создать папку для слайса
  try {
    // обращаемся к утилите, выходящей в рут проекта, и указываем путь к слайсу
    await fs.mkdir(resolvePath('src', layer, sliceName));
  } catch (e) {
    throw new Error(`Не удалось создать директорию для ${layer}/${sliceName}.`);
  }

  // создаем всю структуру слайса
  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
  await createDocumentation(layer, sliceName);
};
