import ChatService from "../services/message.service.js";

class MessageController {
  async sendMessage(req, res) {
    try {
      const response = await ChatService.sendMessage(req.body);
      res.status(200).json({
        success: true,
        message: "Message send successfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getAllMessages(req, res) {
    try {
      const response = await ChatService.getAllMessages(req.params.id);
      res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        data: response,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new MessageController();
