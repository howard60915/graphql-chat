import { GlobalModel, Hash } from "graphql-shortcake";
import client from "./client";
import Conversation from "./Conversation";

export default class User extends GlobalModel {
  static client = client;

  static hasOperator = true;

  static operator = () => User;

  static tableName = "user";

  static columns = {
    email: { type: String },
    password: { type: Hash, paths: ["archive"] },
    isAdmin: { type: Boolean, paths: ["archive"] }
  };

  async checkWritability(user, ThrowError) {
    const result = this.id === user.id || user.isAdmin;
    if (!result) throw new ThrowError();
    return result;
  }

  async haveConversationWith(user) {
    if (!user) throw new Error("Talker required");

    const conversation = new Conversation();
    conversation.name = `${this.email}, ${user.email}`;
    await conversation.save(this);

    return conversation;
  }
}
