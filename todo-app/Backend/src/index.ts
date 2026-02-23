import express from 'express';
import cors from 'cors';
import router from './routes/todoRoutes';

const app = express();

app.use(cors({ origin: 'https://projects-five-tan.vercel.app' }));
app.use(express.json());

app.use('/api', router);

app.listen(3000, () =>
  console.log('Server is running at http://localhost:3000/'),
);
