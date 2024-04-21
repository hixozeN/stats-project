const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.email === req.body.email && user.password === req.body.password,
    );

    if (userFromBd) {
      const { password, ...safetyUserData } = userFromBd;
      return res.json(safetyUserData);
    }

    return res.status(403).json({ message: 'Email or password incorrect.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  return next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on 8000 port');
});
