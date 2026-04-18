import express from 'express';
import { createNote, bulkCreateNotes, getAllNotes, getNoteById, replaceNote, updateNote, deleteNote, bulkDeleteNotes } from '../controllers/note.controller.js';

const router = express.Router();

router.post('/bulk', bulkCreateNotes);
router.delete('/bulk', bulkDeleteNotes);
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;