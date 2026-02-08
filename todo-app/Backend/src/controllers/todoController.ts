import { Request, Response } from 'express';
import { todo } from 'node:test';
import pool from '../config/db';

let todos: any[] = [];

export const createTodo = async (req: Request, res: Response) => {
  const { id, title } = req.body;
  try {
    await pool.query('INSERT INTO todo_table (todo_title) VALUES (?)', [title]);

    const [selectTodo]: any = await pool.query(
      'SELECT id, todo_title as title FROM todo_table',
    );
    res
      .status(201)
      .json({ msg: 'Successfully added item', currentTodos: selectTodo });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to create todo in Server' });
  }
};

export const selectAllTodos = async (req: Request, res: Response) => {
  try {
    const [selectTodos]: any = await pool.query(
      'SELECT id, todo_title as title FROM todo_table',
    );
    res.status(200).json({ msg: 'Successfully fetch todos', res: selectTodos });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch todos' });
  }
};

export const deleteTodos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [deletedTodo]: any = await pool.query(
      'DELETE FROM todo_table WHERE id = ?',
      [id],
    );
    res
      .status(200)
      .json({ msg: 'Successfully deleted item', res: deletedTodo });
  } catch (error) {
    res.status(500).json({ msg: 'Server error, Failed to delete item' });
  }
};
