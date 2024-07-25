# Скрипт создания нового слайса
Входной файл - index.js
Исполняем его, передавая в аргументах название слоя и название слайса.
Например: node createSlice/index.js features addNewNotification

# Утилиты-хелперы
1. **resolvePath** - хелпер выводит нас в рут проект, а дальше можем "провалиться" куда угодно.
Например, в путь до слайса: resolvePath('src', 'features', 'addNewNotification')
Таким образом хелпер выведет нас в рут, затем нужный нам путь.
Нужна для того, чтобы не повторяться с выходом в рут из текущей папки скрипта.
2. firstCharUpperCase - хелпер, приводящий первую букву строки к верхнему регистру.
Например, для удобного форматирования названия компонента.

# Шаблоны для структуры
1. createTemplate - создает структуру слайса, вызывая побочные шаблонизаторы.
Передаем название слоя и название слайса: createTemplate(layer, sliceName);
2. createModel - создает структуру с моделями (типы, слайсы (редакс), селекторы, сервисы).
Передаем название слоя и название слайса: createModel(layer, sliceName);
3. createUI - создает структуру с UI компонентами.
Передаем название слоя и название слайса: createUI(layer, sliceName);
4. createPublicApi - создает publicApi слайса, импортируя наружу все наши внутренности.
Передаем название слоя и название слайса: createPublicApi(layer, sliceName);
5. createDocumentation - создает README.md файл для слайса.

# Шаблоны для конкретных файлов
1. reduxSliceTemplate - шаблон редакс слайса.
2. schemaTypeTemplate - шаблон типизации слайса.
3. componentTemplate - шаблон react-компонента.
4. styleTemplate - шаблон модуля стилей для компонента.
5. storyTemplate - шаблон со сторисами компонента для storybook.
6. testTemplate - шаблон с юнит-тестами компонента.