import express from 'express';
import noteRouter from './routes/note.routes.js';

const app = express();

app.use(express.json());

app.use('/api/notes', noteRouter);

export default app;