import express from 'express';
import customersRoutes from './customersRoutes.js';
import gamesRoutes from './gamesRoutes.js';
import rentalsRoutes from './rentalsRoutes.js';

const router = express.Router();

router.use([customersRoutes, gamesRoutes, rentalsRoutes]);

export default router;