import express from 'express';
import checklistRouter from './routes/checklist.js';
import taskRouter from './routes/tasks.js';
import mainRouter from './routes/main.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import methodOverride from 'method-override';
import './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.use('/checklists', checklistRouter);
app.use(taskRouter);
app.use('/' ,mainRouter);



app.listen(3000, () => {
    console.log('Servidor Rodando');
});