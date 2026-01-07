import express from 'express';
import cors from 'cors';
import { get } from 'node:http';
import { error } from 'node:console';

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

app.post('/signup', (req, res) => {
  const { name, email } = req.body;
  const isUserNameExist = users.find((acc) => acc.name === name);
  const isUserEmailExist = users.find((acc) => acc.email === email);

  if (isUserNameExist) {
    return res.status(400).json({ errorType: 'USERNAME_TAKEN' });
  }
  if (isUserEmailExist) {
    return res.status(400).json({ errorType: 'EMAIL_TAKEN' });
  }
  users.push(req.body);
  console.log('Current users on server', users);
  res.status(201).send({ message: 'User saved successfully' });
});

app.get('/check-users', (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const isUserEmailExist = users.find((acc) => acc.email === email);

  if (isUserEmailExist) {
    if (isUserEmailExist.password === password) {
      res.json(isUserEmailExist);
    } else {
      return res.status(404).json({ errorType: 'PASSWORD_INCORRECT' });
    }
  } else {
    return res.status(404).json({ errorType: 'EMAIL_NOT_FOUND' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
