import { Express } from 'express';
import pacienteRoutes from '../routes/paciente.routes';
import topicoRoutes from '../routes/topico.routes';
import usuarioSistemaRoutes from '../routes/usuarioSistema.routes';
import authRoutes from '../routes/auth.routes';

const setupRoutes = (app: Express) => {
  // Rotas
  app.use('/api/pacientes', pacienteRoutes);
  app.use('/api/topicos', topicoRoutes);
  app.use('/api/usuariosistema', usuarioSistemaRoutes);
  app.use('/api/auth', authRoutes);

  // Rota padrão
  app.get('/', (req, res) => {
    res.json({ message: 'API Dra. Kaysa' });
  });
};

export default setupRoutes; 