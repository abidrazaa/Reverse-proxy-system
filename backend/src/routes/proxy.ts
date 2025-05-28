import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import Log from '../models/Log.js';

const router = Router();

router.use('/users', createProxyMiddleware({
  target: 'https://jsonplaceholder.typicode.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq: async (_proxyReq, req, _res) => {
    try {
      await Log.create({ method: req.method, url: req.originalUrl, timestamp: new Date() });
    } catch (e) { console.error(e); }
  }
}));

export default router;
