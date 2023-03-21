import express from 'express';
import mongoose from 'mongoose';
import checklistController from '../controllers/checklistController.js';
const router = express.Router();


router.get('/', checklistController.showAllChecklists);
router.post('/', checklistController.addNewChecklist);
router.get('/new', checklistController.showNewChecklistForm);
router.get('/:id/edit', checklistController.showEditChecklistForm);
router.put('/:id', checklistController.editChecklist);
router.delete('/:id', checklistController.deleteChecklist);
router.get('/:id', checklistController.showOneChecklist);


export default router;