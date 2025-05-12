import express from 'express';
import corsConfig from './cors';
import path from 'path';

const app = express();

// Middleware
app.use(corsConfig);
app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

export default app; 