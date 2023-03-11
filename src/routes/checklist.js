import express from 'express';
import Checklist from '../models/checklist.js';
const router = express.Router();




router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao exibir as listas' });
    }
});

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;

    try {
        await Checklist.create({ name: name });
        res.redirect('/checklists');
    } catch (error) {
        console.log(error);
        res.status(422).render('checklists/new', { checklist: { ...checklist, error } });
    }
});




router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Algo deu errado!' });
    }
});


router.put('/:id', async (req, res) => {
    let { name } = req.body;
    let { id } = req.params;

    try {
        let checklistToUpdate = await Checklist.findByIdAndUpdate(id, { name: name }, { new: true });
        res.status(200).send(checklistToUpdate);

    } catch (error) {
        res.status(422).send(error);
    }
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        // let checklistSearched = await Checklist.aggregate([{ $lookup: {from: 'tasks', localField: '_id', foreignField: 'checklist', as: 'tasks'} }],);
        res.status(200).render('checklists/show', { checklist: checklistSearched });
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao exibir a tarefa' });
    }
});


export default router;