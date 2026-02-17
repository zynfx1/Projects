import { Request, Response } from 'express';
import pool from '../config/db';

let todos: any[] = [];

export const createTodo = async (req: Request, res: Response) => {
  const { id, title, isComplete } = req.body;
  try {
    await pool.query(
      'INSERT INTO todo_table (todo_title, isComplete) VALUES (?, ?)',
      [title, isComplete],
    );

    const [selectTodo]: any = await pool.query(
      'SELECT id, todo_title as title, isComplete as isComplete FROM todo_table',
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

export const updateTodoStatus = async (req: Request, res: Response) => {
  const { id, title, isComplete } = req.body;
  try {
    const [isTodoComplete]: any = await pool.query(
      'UPDATE todo_table SET todo_title = ?, isComplete = ?  WHERE id = ?',
      [title, isComplete, id],
    );

    const [selectUpdatedTodos]: any = await pool.query(
      'SELECT id,todo_title as title, isComplete FROM todo_table WHERE id = ?',
      [id],
    );

    res
      .status(200)
      .json({ msg: 'Successfully updated', res: selectUpdatedTodos });
  } catch (error) {
    res.status(500).json({ msg: 'Sever error - Failed to update' });
  }
};

export const notCompleteTodos = async (req: Request, res: Response) => {
  try {
    const [selectNotCompleteTodos]: any = await pool.query(
      'SELECT id, todo_title as title, isComplete FROM todo_table WHERE isComplete = 0',
    );
    res.status(200).json({
      msg: 'Successfully fetched not complete todos',
      res: selectNotCompleteTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to load not complete todos' });
  }
};

export const completeTodos = async (req: Request, res: Response) => {
  try {
    const [selectCompleteTodos]: any = await pool.query(
      'SELECT id, todo_title as title, isComplete FROM todo_table WHERE isComplete = 1',
    );
    res.status(200).json({
      msg: 'Successfully fetched complete todos',
      res: selectCompleteTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to load not complete todos' });
  }
};
