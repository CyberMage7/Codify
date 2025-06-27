import express from "express";
import { userRouter } from "./user.router.js";
import { repositoryRouter } from "./repo.router.js";
import { issueRouter } from "./issue.router.js";
export const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repositoryRouter);
mainRouter.use(issueRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome");
});
