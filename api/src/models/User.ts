import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

interface User {
  name: string;
  email: string;
  password: string;
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
  }
});

export default mongoose.model<User & mongoose.Document>("User", userSchema);
