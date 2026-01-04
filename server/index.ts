import express from 'express';

const app = express();
const PORT = 3000;

// This allows the server to understand JSON sent from your Vue app
app.use(express.json());

app.get('/status', (req,res )=>{
    res
})