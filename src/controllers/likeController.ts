import type { Request, Response } from 'express';
import { LikeService } from '../services/likeService.ts';

export class LikeController {
  constructor(private likeService: LikeService = new LikeService()) {}

  createLike = async (req: Request, res: Response): Promise<Response> => {
    const { reviewId, userId } = req.body ?? {};
    if (![reviewId, userId].every(Number.isInteger)) return res.status(400).json({ status: 'fail', message: 'reviewId dan userId wajib berupa integer' });
    try {
      const like = await this.likeService.createLike(reviewId, userId);
      return res.status(201).json({ status: 'success', data: like });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Gagal membuat like', error: error instanceof Error ? error.message : String(error) });
    }
  };

  deleteLike = async (req: Request, res: Response): Promise<Response> => {
    const reviewId = Number(req.params.reviewId);
    const userId = Number(req.params.userId);
    if (![reviewId, userId].every(Number.isInteger) || reviewId < 1 || userId < 1) return res.status(400).json({ status: 'fail', message: 'reviewId dan userId harus berupa integer positif' });
    try {
      return res.status(200).json({ status: 'success', data: await this.likeService.deleteLike(reviewId, userId) });
    } catch (error) {
      if (error instanceof Error && error.message === 'LIKE_NOT_FOUND') return res.status(404).json({ status: 'fail', message: 'Like tidak ditemukan' });
      return res.status(500).json({ status: 'error', message: 'Gagal menghapus like', error: error instanceof Error ? error.message : String(error) });
    }
  };
}