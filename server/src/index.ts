"use strict";

import express from "express";
import dotenv from "dotenv";
import setRouting from "./router";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;

app.use(cors({ origin: `http://localhost:${CLIENT_PORT}` }));
app.use(express.json());
setRouting(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
