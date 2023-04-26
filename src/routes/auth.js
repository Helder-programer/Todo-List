import express from 'express';
import UserController from '../controllers/UserController.js';
const router = express.Router();

router.get('/login', UserController.showLogin);
router.get('/register', UserController.showRegister);
router.post('/register');

export default router;