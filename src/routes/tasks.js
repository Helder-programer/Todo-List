import express from 'express';
import Task from '../models/task.js';
import taskController from '../controllers/taskController.js';
import task from '../models/task.js';
const router = express.Router();


router.get('/checklists/:checklistId/tasks/new', taskController.showNewTaskForm);
router.post('/checklists/:checklistId/tasks', taskController.addNewTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id', taskController.setTaskAsDone);


export default router;

