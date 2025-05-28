import { Router } from 'express';
import Log from '../models/Log.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, async (req, res) => {
  const { search } = req.query;
  const filter = search ? { url: { $regex: search as string, $options: 'i' } } : {};
  res.json(await Log.find(filter).sort({ timestamp: -1 }).limit(500));
});

export default router;
