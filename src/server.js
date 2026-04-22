import express from 'express';
import 'dotenv/config';
// import { logger } from './middleware/logger.js';
// import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
// import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
// app.use(logger);
app.use(express.json());
app.use(cookieParser());

// app.use(notFoundHandler);

// app.use(errors());

// app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
