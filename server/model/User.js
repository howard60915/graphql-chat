import _ from "lodash";
import { GlobalModel, Hash } from "graphql-shortcake";
import client from "./client";

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

  get preChanges() {
    const changes = {};

    _.forEach(this.current, (value, key) => {
      const previous = this.previous[key];
      const current = _.isPlainObject(previous)
        ? _.defaultsDeep({}, value, previous)
        : value;
      if (!_.isEqual(previous, current)) {
        changes[key] = previous;
      }
    });

    return changes;
  }
}
