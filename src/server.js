import express from 'express';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';
import { specs } from './configs/swagger.js';
import weeksRoutes from './routes/weeksRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import emotionRouter from './routes/emotionRoutes.js';
import diaryRoutes from './routes/diaryRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.get('/docs/swagger.json', (req, res) => {
  res.json(specs);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(weeksRoutes);
app.use(authRouter);
app.use(taskRoutes);
app.use(userRoutes);
app.use(emotionRouter);
app.use(diaryRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
