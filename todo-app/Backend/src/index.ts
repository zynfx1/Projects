import express from 'express';
import cors from 'cors';
import router from './routes/todoRoutes';

const app = express();

app.use(cors({ origin: 'https://todo-app-zayn.vercel.app' }));
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
