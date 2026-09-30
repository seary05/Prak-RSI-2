import type { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService.ts';

export class ReviewController {
  constructor(private reviewService: ReviewService = new ReviewService()) {}

  getReviews = async (req: Request, res: Response): Promise<Response> => {
    try {
      const stallId = req.query.stallId === undefined ? undefined : Number(req.query.stallId);
      if (stallId !== undefined && !Number.isInteger(stallId)) return res.status(400).json({ status: 'fail', message: 'stallId harus berupa integer' });
      return res.status(200).json({ status: 'success', data: await this.reviewService.getReviews(stallId) });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  createReview = async (req: Request, res: Response): Promise<Response> => {
    const { stallId, userId, rating, comment } = req.body ?? {};
    if (![stallId, userId, rating].every(Number.isInteger)) return res.status(400).json({ status: 'fail', message: 'stallId, userId, dan rating wajib berupa integer' });
    try {
      const review = await this.reviewService.createReview({ stallId, userId, rating, comment });
      return res.status(201).json({ status: 'success', data: review });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  deleteReview = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json({ status: 'success', data: await this.reviewService.deleteReview(Number(req.params.id)) });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    if (error instanceof Error && error.message === 'INVALID_REVIEW_RATING') return res.status(400).json({ status: 'fail', message: 'rating harus bernilai 1 sampai 5' });
    if (error instanceof Error && error.message === 'REVIEW_NOT_FOUND') return res.status(404).json({ status: 'fail', message: 'Review tidak ditemukan' });
    return res.status(500).json({ status: 'error', message: 'Operasi review gagal', error: error instanceof Error ? error.message : String(error) });
  }
}