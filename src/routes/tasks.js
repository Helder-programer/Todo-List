import express from 'express';
import TaskController from '../controllers/TaskController.js';
const router = express.Router();


router.get('/checklists/:checklistId/tasks/new', TaskController.showNewTaskForm);
router.post('/checklists/:checklistId/tasks', TaskController.addNewTask);
router.delete('/tasks/:id', TaskController.deleteTask);
router.put('/tasks/:id', TaskController.setTaskAsDone);


export default router;

