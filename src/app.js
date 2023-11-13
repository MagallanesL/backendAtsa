import express from 'express';
import morgan from 'morgan';
import afiliadosRoutes from "./routes/afiliados.js";

const app = express();
// const cors = require('cors');
import cors from 'cors';

app.use(cors());


//settings
app.set('port', 3000);

//middleware
app.use(morgan("dev"));
app.use(express.json());


//Routes
app.use("/api/afiliados", afiliadosRoutes);

export default app;
