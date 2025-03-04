import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectDB from './config/db';
import sessionConfig from './utils/session';
import router from './routes';

const app = express();
const port = 3005;

connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }),
  session(sessionConfig),
  bodyParser.json(),
);

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
