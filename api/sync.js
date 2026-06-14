import Redis from 'ioredis';

export default async function handler(req, res) {
  // Настройка CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Получаем URL подключения от Vercel (он пропишется как STORAGE_URL или REDIS_URL)
  const redisUrl = process.env.STORAGE_URL || process.env.REDIS_URL || process.env.KV_URL;

  if (!redisUrl) {
    return res.status(500).json({ 
      error: 'База данных Redis не подключена к проекту. Пожалуйста, подключите ее во вкладке Storage в панели управления Vercel.' 
    });
  }

  let redis;
  try {
    // Подключаемся к Redis
    redis = new Redis(redisUrl);
  } catch (err) {
    console.error('Ошибка инициализации Redis:', err);
    return res.status(500).json({ error: 'Ошибка подключения к базе данных' });
  }

  try {
    // Загрузка данных по ключу (GET)
    if (req.method === 'GET') {
      const { key } = req.query;
      if (!key) {
        await redis.quit();
        return res.status(400).json({ error: 'Параметр key обязателен' });
      }

      const result = await redis.get(`sync:${key}`);
      
      if (result === null) {
        await redis.quit();
        return res.status(200).json({ found: false, data: null });
      }

      const parsedData = JSON.parse(result);
      await redis.quit();
      return res.status(200).json({ found: true, data: parsedData });
    }

    // Сохранение данных по ключу (POST)
    if (req.method === 'POST') {
      const { key, data } = req.body;
      if (!key || !data) {
        await redis.quit();
        return res.status(400).json({ error: 'Параметры key и data обязательны' });
      }

      await redis.set(`sync:${key}`, JSON.stringify(data));
      await redis.quit();
      return res.status(200).json({ success: true });
    }

    await redis.quit();
    return res.status(405).json({ error: 'Метод не поддерживается' });
  } catch (error) {
    console.error('Ошибка API синхронизации:', error);
    if (redis) {
      try { await redis.quit(); } catch (e) {}
    }
    return res.status(500).json({ error: error.message });
  }
}
