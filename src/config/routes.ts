import { Express } from 'express';
import pacienteRoutes from '../routes/paciente.routes';
import topicoRoutes from '../routes/topico.routes';

const setupRoutes = (app: Express) => {
  // Rotas
  app.use('/api/pacientes', pacienteRoutes);
  app.use('/api/topicos', topicoRoutes);

  // Rota padrão
  app.get('/', (req, res) => {
    res.json({ message: 'API Dra. Kaysa' });
  });
};

export default setupRoutes; 