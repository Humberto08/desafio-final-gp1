// código base do servidor express / pra rodar o servidor

import express from 'express';
import router from '../routes/routes';

const app = express();

app.use(express.json()) // usar o formato de dados json pro servidor conseguir receber dados 
app.use(router); // servidor fazer uso das rotas criadas

export default app;