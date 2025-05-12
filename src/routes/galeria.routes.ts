import { Router } from 'express';
import GaleriaController from '../controllers/GaleriaController';
import { auth } from '../middleware/auth';
import upload from '../middleware/upload';

const router = Router();

// Rotas protegidas com autenticação
router.use(auth);

// Criar novo registro (com upload de múltiplas imagens)
router.post('/', 
  upload.fields([
    { name: 'imagemAntes', maxCount: 1 },
    { name: 'imagemDepois', maxCount: 1 },
    { name: 'imagemDepoimento', maxCount: 1 }
  ]),
  GaleriaController.create
);

// Listar todos os registros
router.get('/', GaleriaController.list);

// Buscar registro específico
router.get('/:id', GaleriaController.getById);

// Atualizar registro (com upload de múltiplas imagens)
router.put('/:id',
  upload.fields([
    { name: 'imagemAntes', maxCount: 1 },
    { name: 'imagemDepois', maxCount: 1 },
    { name: 'imagemDepoimento', maxCount: 1 }
  ]),
  GaleriaController.update
);

// Deletar registro
router.delete('/:id', GaleriaController.delete);

export default router; 