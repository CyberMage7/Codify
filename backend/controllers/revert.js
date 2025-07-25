import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

export async function revert(commitID) {
  const repoPath = path.resolve(process.cwd(), ".git");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID);
    const files = await readdir(commitDir);
    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }
    console.log(`Commit ${commitID} reverted successfully`)
  } catch (error) {
    console.log("Error reverting the files", error);
  }
}
