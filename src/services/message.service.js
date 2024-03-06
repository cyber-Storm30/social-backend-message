import MessageModel from "../models/message.model.js";
import axios from "axios";
import { BASE_URL } from "../config/connection.js";

class MessageService {
  async sendMessage(payload) {
    try {
      const newMessage = new MessageModel(payload);
      const savedMessage = await newMessage.save();
      const senderDetailsResponse = await axios.get(
        `${BASE_URL}/auth/user/${savedMessage.sender}`
      );
      const receiverDetailsResponse = await axios.get(
        `${BASE_URL}/auth/user/${savedMessage.receiver}`
      );

      const populatedMessage = {
        ...savedMessage._doc,
        sender: senderDetailsResponse.data.data,
        receiver: receiverDetailsResponse.data.data,
      };

      return populatedMessage;
    } catch (err) {
      throw err;
    }
  }
  async getAllMessages(chatId) {
    try {
      let allMessages = await MessageModel.find({
        chatId: chatId,
      }).sort({ createdAt: -1 });
      const messagesWithUsers = await Promise.all(
        allMessages.map(async (message) => {
          const senderDetailsResponse = await axios.get(
            `${BASE_URL}/auth/user/${message.sender}`
          );
          const senderDetails = senderDetailsResponse.data.data;

          const receiverDetailsResponse = await axios.get(
            `${BASE_URL}/auth/user/${message.receiver}`
          );
          const receiverDetails = receiverDetailsResponse.data.data;

          const messageWithUsers = {
            ...message.toObject(),
            sender: senderDetails,
            receiver: receiverDetails,
          };

          return messageWithUsers;
        })
      );

      return messagesWithUsers;
    } catch (err) {
      throw err;
    }
  }
}

export default new MessageService();
