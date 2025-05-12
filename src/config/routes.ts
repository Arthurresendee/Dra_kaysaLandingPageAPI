import { Express } from 'express';
import topicoRoutes from '../routes/topico.routes';
import usuarioSistemaRoutes from '../routes/usuarioSistema.routes';
import authRoutes from '../routes/auth.routes';
import galeriaRoutes from '../routes/galeria.routes';
import filesRoutes from '../routes/files.routes';

const setupRoutes = (app: Express) => {
  // Rotas
  app.use('/api/topicos', topicoRoutes);
  app.use('/api/usuariosistema', usuarioSistemaRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/galeria', galeriaRoutes);
  app.use('/api/files', filesRoutes);

  // Rota padrão
  app.get('/', (req, res) => {
    res.json({ message: 'API Dra. Kaysa' });
  });
};

export default setupRoutes; 