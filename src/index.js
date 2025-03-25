import express from 'express';
import dotenv from 'dotenv';
import { DB_NAME } from './config/constants.js';
import connect from './config/db.js';

import participantRouter from './controller/participantsController.js';

dotenv.config();

await connect(DB_NAME);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use('/participants', participantRouter);


app.get('/ping', (req, res) => {
  res.send('pong');
});