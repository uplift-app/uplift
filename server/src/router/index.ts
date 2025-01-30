import { Express, Router } from "express";
import activityRouter from "./activityRouter";
import analysisRouter from "./analysisRouter";
import moodRouter from "./moodRouter";
import userRouter from "./userRouter";

const rootRouter = Router();
rootRouter.all("*", (req, res) => {
  res.status(404).send("These are not the routes you are looking for");
});

const setRouting = (app: Express) => {
  app.use("/activity", activityRouter);
  app.use("/analysis", analysisRouter);
  app.use("/mood", moodRouter);
  app.use("/user", userRouter);
  app.use(rootRouter);
};

export default setRouting;
