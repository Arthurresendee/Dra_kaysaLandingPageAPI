import { Request, Response } from 'express';
import Topico from '../models/Topico';

class TopicoController {
  static async getAll(req: Request, res: Response) {
    try {
      const topicos = await Topico.find().populate('cards');
      res.json(topicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tópicos' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const topico = await Topico.findById(req.params.id).populate('cards');
      if (!topico) {
        return res.status(404).json({ error: 'Tópico não encontrado' });
      }
      res.json(topico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tópico' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const topico = await Topico.create(req.body);
      res.status(201).json(topico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tópico' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const topico = await Topico.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('cards');
      if (!topico) {
        return res.status(404).json({ error: 'Tópico não encontrado' });
      }
      res.json(topico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tópico' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const topico = await Topico.findByIdAndDelete(req.params.id);
      if (!topico) {
        return res.status(404).json({ error: 'Tópico não encontrado' });
      }
      res.json({ message: 'Tópico removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover tópico' });
    }
  }
}

export default TopicoController; 