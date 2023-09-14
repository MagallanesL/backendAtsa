import express from 'express';
import morgan from 'morgan';
import afiliadosRoutes from "./routes/afiliados.js";

const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
  }));


//settings
app.set('port', 3000);

//middleware
app.use(morgan("dev"));
app.use(express.json());


//Routes
app.use("/api/Afiliados/", afiliadosRoutes);

export default app;