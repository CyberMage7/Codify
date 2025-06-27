import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }
    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();
    res.status(201).json({
      message: "Repository created!",
      repositoryID: result.id,
    });
  } catch (error) {
    console.error("Error during creation: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function getAllRepository(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (error) {
    console.error("Error during fetching repositories: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function fetchRepositoryById(req, res) {
  const { repoID } = req.params;

  try {
    const repository = await Repository.findOne({ _id: repoID })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (error) {
    console.error("Error during fetching repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function fetchRepositoryByName(req, res) {
  const { name } = req.params;

  try {
    const repository = await Repository.find({ name: name })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (error) {
    console.error("Error during fetching repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function fetchRepositoryForCurrentUser(req, res) {
  const userID = req.params.userID;
  try {
    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User Repositories not found" });
    }

    res.json({ message: "Repositories found!", repositories });
  } catch (error) {
    console.error("Error during fetching repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function updateRepository(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    repository.content.push(content);
    repository.description.push(description);

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error("Error during updating repository: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error(
      "Error during updating repository visibility: ",
      error.message
    );
    return res.status(500).send("Server error");
  }
}

export async function deleteRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }
    res.json({ message: "Repository deleted Successfully" });
  } catch (error) {
    console.error("Error during deleting repository: ", error.message);
    return res.status(500).send("Server error");
  }
}
