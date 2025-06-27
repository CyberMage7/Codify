import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ReturnDocument } from "mongodb";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

export async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("codify");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: result.insertId });
  } catch (error) {
    console.error("Error signing in: " + error);
    res.status(500).send("Server error");
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("codify");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during login: ", error.message);
    res.status(500).send("Server error");
  }
}

export async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("codify");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error during fetching: ", error.message);
    res.status(500).send("Server error");
  }
}

export async function getUserProfile(req, res) {
  const currentId = req.params.id;

  try {
    await connectClient();
    const db = client.db("codify");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentId),
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({
      message: "Profile fetched",
      user,
    });
  } catch (error) {
    console.error("Error during fetching: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function updateUserProfile(req, res) {
  const currentId = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("codify");
    const usersCollection = db.collection("users");

    let updateFields = { email };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentId) },
      { $set: updateFields },
      { returnDocument: "after" } // ✅ corrected
    );

    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Optionally exclude password before sending
    const { password: _, ...safeUser } = result.value;

    res.status(200).json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error during updating: ", error.message);
    return res.status(500).send("Server error");
  }
}

export async function deleteUserProfile(req, res) {
  const currentId = req.params.id;
  try {
    await connectClient();
    const db = client.db("codify");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentId),
    });
    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "User Profile Deleted!!" });
  } catch (error) {
    console.error("Error during deleting: ", error.message);
    return res.status(500).send("Server error");
  }
}
