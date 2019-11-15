import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

interface Photo {
  unSplashId: string;
  pictureUrl: string;
  user: string;
}

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

export default mongoose.model<Photo & mongoose.Document>("Photo", photoSchema);
