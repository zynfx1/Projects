import { Router } from 'express';
import { createTodo, selectAllTodos } from '../controllers/todoController';

const router = Router();

router.post('/createTodo', createTodo);
router.get('/select-todos', selectAllTodos);

export default router;
