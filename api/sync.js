export default async function handler(req, res) {
  // Разрешаем CORS-запросы
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ 
      error: 'База данных Vercel KV не подключена к проекту. Пожалуйста, подключите ее во вкладке Storage в панели управления Vercel.' 
    });
  }

  try {
    // Получение данных по ключу (GET)
    if (req.method === 'GET') {
      const { key } = req.query;
      if (!key) {
        return res.status(400).json({ error: 'Параметр key обязателен' });
      }

      const fetchUrl = `${url}/get/sync:${encodeURIComponent(key)}`;
      const response = await fetch(fetchUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error(`Ошибка базы данных: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result || result.result === null) {
        return res.status(200).json({ found: false, data: null });
      }

      // Vercel KV возвращает строку, парсим её
      const parsedData = JSON.parse(result.result);
      return res.status(200).json({ found: true, data: parsedData });
    }

    // Сохранение данных по ключу (POST)
    if (req.method === 'POST') {
      const { key, data } = req.body;
      if (!key || !data) {
        return res.status(400).json({ error: 'Параметры key и data обязательны' });
      }

      const fetchUrl = `${url}/set/sync:${encodeURIComponent(key)}`;
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify(data)) // Двойная сериализация для Redis
      });

      if (!response.ok) {
        throw new Error(`Ошибка базы данных: ${response.statusText}`);
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Метод не поддерживается' });
  } catch (error) {
    console.error('Ошибка API синхронизации:', error);
    return res.status(500).json({ error: error.message });
  }
}
