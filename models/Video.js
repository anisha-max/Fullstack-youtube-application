import { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 940,
  height: 520,
}



const videoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
    comments: [{
      text: {
        type: String
      },
      user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    }, { timestamps: true }]
  },
  { timestamps: true }
);

const Video = models?.Video || model("Video", videoSchema);

export default Video;