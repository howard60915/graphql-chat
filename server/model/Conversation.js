import Model from "./Model";
import User from "./User";

export default class Conversation extends Model {
  static tableName = "conversation";

  static columns = {
    user: { type: User, name: "userId" },
    talker: { type: User, name: "talkerId" }
  };
}
