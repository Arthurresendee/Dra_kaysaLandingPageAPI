import { Request, Response } from 'express';
import Topico from '../models/Topico';

class TopicoController {
  async getAll(req: Request, res: Response) {
    try {
      const topicos = await Topico.find().populate('cards');
      res.json(topicos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tópicos', error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const topico = await Topico.findById(req.params.id).populate('cards');
      if (!topico) {
        return res.status(404).json({ message: 'Tópico não encontrado' });
      }
      res.json(topico);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar tópico', error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const topico = new Topico(req.body);
      await topico.save();
      res.status(201).json(topico);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar tópico', error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const topico = await Topico.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!topico) {
        return res.status(404).json({ message: 'Tópico não encontrado' });
      }
      res.json(topico);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar tópico', error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const topico = await Topico.findByIdAndDelete(req.params.id);
      if (!topico) {
        return res.status(404).json({ message: 'Tópico não encontrado' });
      }
      res.json({ message: 'Tópico deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar tópico', error });
    }
  }
}

export default new TopicoController(); 