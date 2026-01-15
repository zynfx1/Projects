import express from 'express';
import cors from 'cors';
import { get } from 'node:http';
import { error } from 'node:console';
import { json } from 'node:stream/consumers';
import dotenv from 'dotenv';
import pool from './db/database';

const app = express();
const PORT = 3000;
let users: any[] = [];
// This allows the server to understand JSON sent from your Vue app
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.send('server is okasy');
});

app.get('/profile', (req, res) => {
  res.json({ name: 'zyn', role: 'web dev' });
});

app.get('/skills', (req, res) => {
  res.json(['intermediate', 'beginner']);
});

app.get('/greet/:name', (req, res) => {
  const userName = req.params.name;
  res.send(`Hello, ${userName}. Welcome back`);
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [rows_name]: any = await pool.query(
      'SELECT * FROM users_table WHERE name = ?',
      [name]
    );
    const [rows_email]: any = await pool.query(
      'SELECT * FROM users_table WHERE email = ?',
      [email]
    );

    if (rows_name.length > 0) {
      return res.status(400).json({ errorType: 'USERNAME_TAKEN' });
    }
    if (rows_email.length > 0) {
      return res.status(400).json({ errorType: 'EMAIL_TAKEN' });
    }

    const [result]: any = await pool.query(
      'INSERT INTO users_table (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    console.log('Current users in database:', result.affectedRows);
    res.status(201).send({ message: 'User saved successfully' });
  } catch (err) {
    return res.status(500).json({ errorType: 'SERVER_ERROR', details: err });
  }
});

app.post('/check-users', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const [email_rows]: any = await pool.query(
      'SELECT * FROM users_table WHERE email = ?',
      [email]
    );

    if (email_rows.length > 0) {
      const foundUser = email_rows[0];
      if (foundUser.password === password) {
        return res.status(200).json({ msg: 'LOGIN_SUCCESS', user: foundUser });
      } else {
        return res.status(401).json({ errorType: 'PASSWORD_INCORRECT' });
      }
    } else {
      return res.status(404).json({ errorType: 'EMAIL_NOT_FOUND' });
    }
  } catch (error) {
    return res.status(500).json({ errorType: 'SERVER_ERROR', details: error });
  }
});

app.delete('/delete-user/:email', (req, res) => {
  const emailToDelete = req.params.email;
  users = users.filter((acc) => acc.email !== emailToDelete);
  console.log('Current users on server', users);
  res.status(201).json({ msg: 'ACC_DELETED' });
});

app.put('/update-user', (req, res) => {
  const { id, name, email, password, newPassword, confirmNewPassword } =
    req.body;

  const findTargetUser = users.find((acc) => acc.id === id);

  if (!findTargetUser) {
    res.status(401).json({ msg: 'USER_NOT_FOUND' });
  }

  if (password) {
    if (findTargetUser.password !== password) {
      return res.status(400).json({ msg: 'PASSWORD_INCORRECT' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ msg: 'PASSWORD_NOT_MATCH' });
    }
  }

  users = users.map((acc) => {
    if (acc.id === findTargetUser.id) {
      return {
        ...acc,
        name: name || acc.name,
        email: email || acc.email,
        password: newPassword ? newPassword : acc.password,
      };
    }
    return acc;
  });

  console.log('Updated for', id);
  res.status(200).json({ msg: 'Successfuly updated user', user: users });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
