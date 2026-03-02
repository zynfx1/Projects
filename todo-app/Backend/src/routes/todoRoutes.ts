import { Router } from 'express';
import {
  createTodo,
  selectAllTodos,
  deleteTodos,
  updateTodoStatus,
  notCompleteTodos,
  completeTodos,
  updateTodo,
  healthCheck,
} from '../controllers/todoController';

const router = Router();

router.post('/createTodo', createTodo);
router.get('/select-todos', selectAllTodos);
router.delete('/delete-todo/:id', deleteTodos);
router.put('/update-todo', updateTodoStatus);
router.put('/update-todos', updateTodo);
router.get('/select-not-complete-todos', notCompleteTodos);
router.get('/select-complete-todos', completeTodos);
router.get('/health', healthCheck);

export default router;
