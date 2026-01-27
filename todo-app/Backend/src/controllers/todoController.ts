import { Request, Response } from 'express';

let todos: any[] = [];

export const createTodo = async (req: Request, res: Response) => {
  const title = req.body.title;
  todos.push(title);
  res.status(200).json({ msg: 'Successfully added item', currentTodos: todos });

  console.log('Current Items in Todo', todos);
};
