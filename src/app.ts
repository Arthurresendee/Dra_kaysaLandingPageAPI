import dotenv from 'dotenv';
import connectDB from './config/mongoose';
import app from './config/express';
import startServer from './config/server';
import setupRoutes from './config/routes';
import env from './config/env';

dotenv.config();

// Conexão com MongoDB
connectDB();

// Configurar rotas
setupRoutes(app);

// Iniciar servidor
startServer(); 