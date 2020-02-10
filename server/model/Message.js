import Model from "./Model";
import User from "./User";
import Conversation from "./Conversation";

export default class Message extends Model {
  static tableName = "message";

  static columns = {
    user: { type: User, name: "userId" },
    conversation: { type: Conversation, name: "conversationId" },
    content: { type: String }
  };
}
