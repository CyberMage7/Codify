import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  repositories: {
    type: [{ type: Schema.Types.ObjectId, ref: "Repository" }],
    default: [],
  },
  followedUsers: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  starRepos: {
    type: [{ type: Schema.Types.ObjectId, ref: "Repository" }],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
