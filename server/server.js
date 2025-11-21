import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import linkRouter from './routes/linkRoute.js';
import 'dotenv/config';
import { redirectUrl } from './controllers/linkController.js';

const app = express()

const startTime = Date.now();

const allowedOrigins = ['http://localhost:5173','http://localhost:5173/:code', process.env.FRONTEND_URL]

app.use(express.json())
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/healthz', (req, res) => {
    res.status(200).json({
        ok: true,
        version: "1.0",
        uptime: `${Math.floor((Date.now() - startTime) / 1000)}s`
    })
})

app.use('/api', linkRouter);
app.get('/:code', redirectUrl);



const PORT = process.env.PORT || 5000;

await connectDB();


app.listen(PORT, ()=> {
    console.log(`Server is ruunning on ${PORT}`)
})
