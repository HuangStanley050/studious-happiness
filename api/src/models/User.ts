import mongoose from "mongoose";
const Schema = mongoose.Schema;

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  keyWords: string[];
  photos: mongoose.Schema.Types.ObjectId[];
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  keyWords: {
    type: [String]
  },
  photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }]
});

export default mongoose.model<UserDocument>("User", userSchema);
