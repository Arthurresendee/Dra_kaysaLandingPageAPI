import { Router } from 'express';
import gridfs from '../utils/gridfs';

const router = Router();

// Rota para servir arquivos do GridFS
router.get('/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const fileBuffer = await gridfs.downloadFromGridFS(fileId);
    
    // Definir o tipo de conteúdo como imagem
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(fileBuffer);
  } catch (error) {
    res.status(404).json({ message: 'Arquivo não encontrado' });
  }
});

export default router; 