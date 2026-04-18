import Note from '../models/note.model.js';
import mongoose from 'mongoose';

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required', data: null });
    }
    const note = await Note.create(req.body);
    return res.status(201).json({ success: true, message: 'Note created successfully', data: note });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const bulkCreateNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({ success: false, message: 'Notes array is required', data: null });
    }
    const createdNotes = await Note.insertMany(notes);
    return res.status(201).json({ success: true, message: `${notes.length} notes created successfully`, data: createdNotes });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ success: true, message: 'Notes fetched successfully', data: notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID', data: null });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found', data: null });
    }
    return res.status(200).json({ success: true, message: 'Note fetched successfully', data: note });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID', data: null });
    }
    const note = await Note.findByIdAndUpdate(id, req.body, { new: true, overwrite: true, runValidators: true });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found', data: null });
    }
    return res.status(200).json({ success: true, message: 'Note replaced successfully', data: note });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID', data: null });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided to update', data: null });
    }
    const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found', data: null });
    }
    return res.status(200).json({ success: true, message: 'Note updated successfully', data: note });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID', data: null });
    }
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found', data: null });
    }
    return res.status(200).json({ success: true, message: 'Note deleted successfully', data: null });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

export const bulkDeleteNotes = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'IDs array is required', data: null });
    }
    const result = await Note.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({ success: true, message: `${ids.length} notes deleted successfully`, data: null });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};