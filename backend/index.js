import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import yargs from "yargs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import { mainRouter } from "./routes/main.router.js";
import { hideBin } from "yargs/helpers";

import { initRepo } from "./controllers/init.js";
import { add } from "./controllers/add.js";
import { commit } from "./controllers/commit.js";
import { push } from "./controllers/push.js";
import { pull } from "./controllers/pull.js";
import { revert } from "./controllers/revert.js";

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Starts a new sever", {}, startServer)
  .command("init", "Initialize a repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to be added in staging area",
        type: "string",
      });
    },
    (argv) => {
      add(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the stagged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commit(argv.message);
    }
  )
  .command("push", "Push commits to S3", {}, push)
  .command("pull", "Pull commits from S3", {}, pull)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit Id to revert to",
        type: "string",
      });
    },
    (argv) => {
      revert(argv.commitID);
    }
  )
  .demandCommand(1, "You need atleaset one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());
  const mongoURI = process.env.MONGODB_URI;

  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected!!"))
    .catch((err) => console.log("Unable to connect: ", err));

  app.use(cors({ origin: "*" }));

  app.use("/", mainRouter);

  let user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
    // CRUD operations
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}
