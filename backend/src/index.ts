import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (_req, res) => res.json({ status: 'ok' }));

const PORT = Number(process.env.PORT) || 5000;
const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/proxylogger';

mongoose.connect(URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
  })
  .catch(err => { console.error(err); process.exit(1); });
