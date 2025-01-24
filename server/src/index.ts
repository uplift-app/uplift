"use strict";

import express from "express";
import dotenv from "dotenv";
import setRouting from "./router";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
setRouting(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
