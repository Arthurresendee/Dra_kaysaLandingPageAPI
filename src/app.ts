import dotenv from 'dotenv';
import connectDB from './config/mongoose';
import app from './config/express';
import startServer from './config/server';
import setupRoutes from './config/routes';
import env from './config/env';

// Importando rotas
import pacienteRoutes from './routes/paciente.routes';
import dentistaRoutes from './routes/dentista.routes';
import enderecoRoutes from './routes/endereco.routes';
import topicoRoutes from './routes/topico.routes';
import cardRoutes from './routes/card.routes';
import imagemRoutes from './routes/imagem.routes';

dotenv.config();

// Conexão com MongoDB
connectDB();

// Configurar rotas
setupRoutes(app);

// Rotas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/dentistas', dentistaRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/topicos', topicoRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/imagens', imagemRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API Dra. Kaysa' });
});

// Iniciar servidor
startServer(); 