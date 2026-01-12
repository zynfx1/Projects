import express from 'express';
import cors from 'cors';
import { get } from 'node:http';
import { error } from 'node:console';
import { json } from 'node:stream/consumers';

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
  console.log('Current users on server: ', users);
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
