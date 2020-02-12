import Model from "./Model";
import User from "./User";
import Conversation from "./Conversation";

export default class UserConversation extends Model {
  static tableName = "user_conversation";

  static softDelete = false;

  static columns = {
    user: { type: User, name: "userId" },
    conversation: { type: Conversation, name: "conversationId" }
  };
}
