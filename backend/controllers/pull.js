import fs from "fs/promises";
import path from "path";
import { s3, S3_BUCKET } from "../config/aws-config.js";

export async function pull() {
  const repoPath = path.resolve(process.cwd(), ".git");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const data = await s3
      .listObjectsV2({ Bucket: S3_BUCKET, Prefix: "commits/" })
      .promise();

    const objects = data.Contents;

    for (const object of objects) {
      const key = object.Key;

      if (key.endsWith("/")) continue; // Skip folders

      const localPath = path.join(repoPath, key); // Absolute local path
      const localDir = path.dirname(localPath); // Ensure directory exists

      await fs.mkdir(localDir, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      const { Body } = await s3.getObject(params).promise();

      await fs.writeFile(localPath, Body); // Body is a Buffer
    }

    console.log("All commits pulled from S3.");
  } catch (error) {
    console.error("Error pulling from S3:", error);
  }
}
