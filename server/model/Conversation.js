import Model from "./Model";

export default class Conversation extends Model {
  static tableName = "conversation";

  static columns = {
    name: { type: String }
  };
}
