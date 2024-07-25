const createTemplate = require('./templates/createTemplate');

async function startProcess() {
  // вытягиваем аргументы командной строки
  const layer = process.argv[2];
  const sliceName = process.argv[3];

  // массив допустимых слоев
  const layers = ['features', 'entities', 'pages'];

  // проверка аргументов командной строки
  if (process.argv.length <= 2) {
    throw new Error('Нужно передать 2 аргумента: слой и слайс. Например, features addNewNotification');
  }

  // проверка слоя
  if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите один из допустимых слоев: ${layers.join(', ')}`);
  }

  // проверка слайса
  if (!sliceName) {
    throw new Error('Не указано название слайса.');
  }

  await createTemplate(layer, sliceName);
}

startProcess()
  .then(() => console.log('Слайс успешно создан.'))
  .catch((e) => console.log(e));
