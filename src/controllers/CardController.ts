import { Request, Response } from 'express';
import Card from '../models/Card';

class CardController {
  async getAll(req: Request, res: Response) {
    try {
      const cards = await Card.find().populate('topico');
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cards', error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const card = await Card.findById(req.params.id).populate('topico');
      if (!card) {
        return res.status(404).json({ message: 'Card não encontrado' });
      }
      res.json(card);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar card', error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const card = new Card(req.body);
      await card.save();
      res.status(201).json(card);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar card', error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!card) {
        return res.status(404).json({ message: 'Card não encontrado' });
      }
      res.json(card);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar card', error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const card = await Card.findByIdAndDelete(req.params.id);
      if (!card) {
        return res.status(404).json({ message: 'Card não encontrado' });
      }
      res.json({ message: 'Card deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar card', error });
    }
  }
}

export default new CardController(); 