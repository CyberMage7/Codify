import fs from "fs/promises";
import path from "path";

export async function add(filePath) {
  const repoPath = path.resolve(process.cwd(), ".git");
  const stagingPath = path.join(repoPath, "staging");

  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} added to staging area!`);
  } catch (error) {
    console.log("Error adding file: ", error);
  }
}
