// Домены, для которых разрешены кросс-доменные запросы
const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
]

const cors = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса

  // Проверка на наличие источника в разрешенных
  if (allowedCors.includes(origin)) {
    // Установка заголовка, разрешающий браузеру запросы из источнка
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
}

module.exports = cors;
