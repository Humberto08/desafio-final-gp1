// código base do servidor express / pra rodar o servidor

import express from 'express';
import router from '../routes/routes';

const app = express();

app.use(express.json());
app.use(router);

export default app;