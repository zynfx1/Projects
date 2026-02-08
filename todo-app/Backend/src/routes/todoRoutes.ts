import { Router } from 'express';
import {
  createTodo,
  selectAllTodos,
  deleteTodos,
} from '../controllers/todoController';

const router = Router();

router.post('/createTodo', createTodo);
router.get('/select-todos', selectAllTodos);
router.delete('/delete-todo/:id', deleteTodos);

export default router;
