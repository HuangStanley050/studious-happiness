import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

interface User {
  name: string;
  email: string;
  password: string;
  keyWords: string[];
  photos: string[];
}

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

export default mongoose.model<User & mongoose.Document>("User", userSchema);
