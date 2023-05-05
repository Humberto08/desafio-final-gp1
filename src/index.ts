import express, { json } from 'express';
import routers from './routes/routes';

const app = express();
app.use(express, json());
app.use(routers)

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`✔️ Server running in localhost:${PORT}`)
})

export default app;