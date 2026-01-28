import { Request, Response } from 'express';
import { todo } from 'node:test';

let todos: any[] = [];

export const createTodo = async (req: Request, res: Response) => {
  const { id, title } = req.body;
  todos.push(title);
  res.status(200).json({ msg: 'Successfully added item', currentTodos: todos });
  console.log('Current Items in Todo', todos, id);
};
