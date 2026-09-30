import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController.ts';

const reviewRouter = Router();
const controller = new ReviewController();

reviewRouter.get('/', (req, res) => controller.getReviews(req, res));
reviewRouter.post('/', (req, res) => controller.createReview(req, res));
reviewRouter.delete('/:id', (req, res) => controller.deleteReview(req, res));

export { reviewRouter };