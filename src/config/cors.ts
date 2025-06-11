import cors from 'cors';

const corsConfig = cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://drakaysa.com.br', 'https://adm.drakaysa.com.br', 'https://api.drakaysa.com.br']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 horas em segundos
});

export default corsConfig; 