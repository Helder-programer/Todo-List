import express from 'express';
import mongoose from 'mongoose';
import ChecklistController from '../controllers/ChecklistController.js';
const router = express.Router();


router.get('/', ChecklistController.showAllChecklists);
router.post('/', ChecklistController.addNewChecklist);
router.get('/new', ChecklistController.showNewChecklistForm);
router.get('/:id/edit', ChecklistController.showEditChecklistForm);
router.put('/:id', ChecklistController.editChecklist);
router.delete('/:id', ChecklistController.deleteChecklist);
router.get('/:id', ChecklistController.showOneChecklist);


export default router;