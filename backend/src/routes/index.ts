import { Router } from 'express';
import authRoutes from './auth.js';
import logRoutes from './logs.js';
import proxyRoutes from './proxy.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/logs', logRoutes);
router.use('/', proxyRoutes);
export default router;
