import { Express } from 'express';
import pacienteRoutes from '../routes/paciente.routes';
import topicoRoutes from '../routes/topico.routes';
import cardRoutes from '../routes/card.routes';
import imagemRoutes from '../routes/imagem.routes';

const setupRoutes = (app: Express) => {
  // Rotas
  app.use('/api/pacientes', pacienteRoutes);
  app.use('/api/topicos', topicoRoutes);
  app.use('/api/cards', cardRoutes);
  app.use('/api/imagens', imagemRoutes);

  // Rota padrão
  app.get('/', (req, res) => {
    res.json({ message: 'API Dra. Kaysa' });
  });
};

export default setupRoutes; 