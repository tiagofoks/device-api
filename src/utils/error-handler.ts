import { Response } from 'express';
import { NotFoundError } from './errors';

export function errorHandler(res: Response, error: any): void {
  console.error(error);

  if (error instanceof NotFoundError) {
    res.status(404).json({ error: error.message });
  } else if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}