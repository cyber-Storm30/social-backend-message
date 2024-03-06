import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, default: "" },
    receiver: { type: String, default: "" },
    content: { type: String, trim: true },
    chatId: { type: String, default: "" },
    readBy: [{ type: String, default: "" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
