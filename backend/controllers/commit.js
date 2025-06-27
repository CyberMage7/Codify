import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function commit(message) {
  const repoPath = path.resolve(process.cwd(), ".git");
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitId = uuid();
    const commitDir = path.join(commitPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagedPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file)
      );
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() })
    );
    console.log(`Commit ${commitId} created with message: ${message}`);
  } catch (error) {
    console.log("Error committing files");
  }
}
