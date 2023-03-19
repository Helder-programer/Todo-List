import Checklist from '../models/checklist.js';
import Task from '../models/task.js';
import mongoose from 'mongoose';


export default {
    async showAllChecklists(req, res) {
        try {
            let checklists = await Checklist.aggregate([{ $lookup: { from: 'tasks', localField: '_id', foreignField: 'checklistId', as: 'tasks' } }]);

            res.status(200).render('checklists/index', { checklists: checklists });
        } catch (error) {
            console.log(error);
            res.status(422).render('pages/error', { message: 'Erro ao listar as checklists' });
        }
    },

    async addNewChecklist(req, res) {
        let { name } = req.body.checklist;
        let checklist = new Checklist({ name });

        let isValidName = name != '';
        if (!isValidName) return res.status(422).render('checklists/new', { checklist: { ...checklist }, message: 'Digite um nome válido' });

        try {
            await checklist.save();
            res.redirect('/checklists');
        } catch (error) {
            console.log(error);
            res.status(422).render('checklists/new', { checklist: { ...checklist, message: 'Algo deu errado!' } });
        }
    },

    async showNewChecklistForm(req, res) {
        try {
            let checklist = new Checklist();
            res.status(200).render('checklists/new', { checklist, message: '' });
        } catch (error) {
            console.log(error);
            res.status(500).render('pages/error', { message: 'Erro ao exibir adição de tarefas!' });
        }
    },

    async showEditChecklistForm(req, res) {
        let { id } = req.params;
        try {
            let checklist = await Checklist.findById(id);
            res.status(200).render('checklists/edit', { checklist, message: '' });
        } catch (error) {
            console.log(error);
            res.status(422).render('pages/error', { message: 'Erro ao abrir edição de litas de tarefas' });
        }
    },

    async editChecklist(req, res) {
        let { id } = req.params;
        let { name } = req.body.checklist;

        try {
            var checklistToUpdate = await Checklist.findById(id);
            await checklistToUpdate.update({ name: name });
            res.redirect('/checklists');
        } catch (error) {
            console.log(error);
            res.status(422).render('checklists/edit', { checklist: checklistToUpdate });
        }
    },

    async deleteChecklist(req, res) {
        let { id } = req.params;
        try {
            await Checklist.findByIdAndRemove(id);
            await Task.remove({ checklistId: id });
            res.redirect('/checklists');
        } catch (error) {
            console.log(error);
            res.status(422).render('pages/error', { message: 'Erro ao deletar lista de tarefas' });
        }
    },

    async showOneChecklist(req, res) {
        let { id } = req.params;

        try {
            let checklistSearched = await Checklist.aggregate(
                [
                    {
                        $match: {
                            _id: mongoose.Types.ObjectId(id)

                        }
                    },
                    {
                        $lookup: { from: 'tasks', localField: '_id', foreignField: 'checklistId', as: 'tasks' }
                    }
                ]
            );

            checklistSearched = checklistSearched.shift();
            res.status(200).render('checklists/show', { checklist: checklistSearched });
        } catch (error) {
            console.log(error);
            res.status(422).render('pages/error', { message: 'Erro ao exibir a lista de tarefas' });
        }
    }
}