import express, { json } from "express";
import isElectableRouter from "./routers/isElectableRouter.js";

const app = express();
app.use(json());
app.use(isElectableRouter);

export default app;