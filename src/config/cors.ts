import cors from 'cors';

const corsConfig = cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://drakaysa.com.br', 'http://localhost:5173']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600
});

export default corsConfig; 