import mongoose from "mongoose";
const Schema = mongoose.Schema;

export type PhotoDocument = mongoose.Document & {
  unSplashId: string;
  pictureUrl: string;
  user: string;
};

const photoSchema = new Schema({
  unSplashId: {
    type: String,
    required: true
  },
  pictureUrl: {
    type: String,
    required: true
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId
  }
});

export default mongoose.model<PhotoDocument>("Photo", photoSchema);
