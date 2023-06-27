import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function findAll(req: Request, res: Response) {
  const response = await orderService.findAll();

  res.status(200).json(response.data);
}

export default {
  findAll,
};