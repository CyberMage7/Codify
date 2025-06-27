import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    console.error("Error during creating issue: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function updateIssueById(req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }
    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();
    res.json({ message: "Issue updated", issue });
  } catch (error) {
    console.error("Error during updating issue: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function deleteIssueById(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }
    res.json({ message: "Issue deleted" });
  } catch (error) {
    console.error("Error during deleting issue: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function getAllIssues(req, res) {
  const { id } = req.params;
  try {
    const issues = await Issue.find({ repository: id });

    if (issues.length === 0) {
      return res.status(404).json({ error: "No issues found!" });
    }
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error during fetching issues: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function getIssueById(req, res) {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    res.json(issue);
  } catch (error) {
    console.error("Error during updating issue: ", error.message);
    return res.status(500).send("Server error");
  }
}
