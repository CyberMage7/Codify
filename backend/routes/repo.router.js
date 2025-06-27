import express from "express";
import {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepository,
  toggleVisibilityById,
  deleteRepositoryById,
} from "../controllers/repoController.js";

export const repositoryRouter = express.Router();

repositoryRouter.post("/repo/create", createRepository);
repositoryRouter.get("/repo/all", getAllRepository);
repositoryRouter.get("/repo/:id", fetchRepositoryById);
repositoryRouter.get("/repo/name/:name", fetchRepositoryByName);
repositoryRouter.get("/repo/user/:userID", fetchRepositoryForCurrentUser);
repositoryRouter.put("/repo/update/:id", updateRepository);
repositoryRouter.patch("/repo/toggle/:id", toggleVisibilityById);
repositoryRouter.delete("/repo/delete/:id", deleteRepositoryById);
