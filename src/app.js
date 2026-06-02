import express from 'express';

const app = express();
//require all the routes here
const authRouter = await import('./routes/authRoutes.js');

//using the routes here
app.use('/api/auth', authRouter.default);

app.use(express.json());

export default app;