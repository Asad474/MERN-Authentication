import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userroutes from './routes/userRoutes.js';
import connDB from "./config/db.js";
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/', (req, res) => {
    return res.send('Home');
});

app.use('/api/users', userroutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port}.`);
});