import express from 'express';
import Task from '../models/task.js';

const router = express.Router();


router.get('/checklists/:checklistId/tasks/new', async (req, res) => {
    let { checklistId } = req.params;


    try {
        let newTask = new Task();
        res.status(200).render('tasks/new', { checklistId, task: newTask, message: ' ' });
    } catch (error) {
        console.log(error);
        res.status(422).render('pages/error', { message: 'Erro ao abri cadastro de tarefas!' });
    }
});


router.post('/checklists/:checklistId/tasks', async (req, res) => {
    let { name } = req.body.task;
    let { checklistId } = req.params;
    let task = new Task({ name, checklistId });
    let isValidName = name != '';

    if (!isValidName) return res.status(422).render('tasks/new', { ...task, checklistId, message: 'Digite um nome para sua tarefa!' });


    try {
        await task.save();
        res.redirect(`/checklists/${checklistId}`);
    } catch (error) {
        console.log(error);
        res.status(422).render('pages/error', { message: 'Erro ao inserir uma nova tarefa!' });
    }

});



router.delete('/tasks/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let task = await Task.findOneAndRemove(id);
        let checklistId = task.checklistId;
        res.redirect(`/checklists/${checklistId}`);
    } catch (error) {
        console.log(error);
        res.status(422).render('pages/error', { message: 'Erro ao excluir uma tarefa!' });

    }
});


router.put('/tasks/:id', async (req, res) => {
    let { id } = req.params;
    let task = await Task.findById(id);

    try {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({ task }); 
    } catch (error) {
        console.log(error);
        res.status(422).render('pages/error', { message: 'Erro ao atualizar uma tarefa!' });
    }
});


export default router;

