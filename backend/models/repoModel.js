import mongoose from "mongoose";
const { Schema } = mongoose;

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  content: [
    {
      type: String,
    },
  ],
  visibility: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  // New fields for NewVault form
  primaryLanguage: {
    type: String,
    default: 'JavaScript',
  },
  addReadme: {
    type: Boolean,
    default: false,
  },
  addGitignore: {
    type: Boolean,
    default: false,
  },
  gitignoreTemplate: {
    type: String,
    default: 'Node',
  },
}, { 
  timestamps: true // This adds createdAt and updatedAt automatically
});

const Repository = mongoose.model("Repository", RepositorySchema);

export default Repository;
