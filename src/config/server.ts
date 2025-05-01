import app from './express';
import env from './env';

const startServer = () => {
  app.listen(env.port, () => {
    console.log(`Servidor rodando na porta ${env.port}`);
  });
};

export default startServer; 