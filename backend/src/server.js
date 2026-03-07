import express from 'express';
import dotenv from 'dotenv';
import donorRoutes from './routes/donorRoutes.js';
import {connectDB} from './config/db.js';
import cors from "cors";
import dns from "node:dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())
app.use("/donors", donorRoutes)


connectDB();
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/donors`)
    })
