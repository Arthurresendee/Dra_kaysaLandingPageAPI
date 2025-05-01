import express from 'express';
import corsConfig from './cors';

const app = express();

// Middleware
app.use(corsConfig);
app.use(express.json());

export default app; 