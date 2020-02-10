import _ from "lodash";
import { GlobalModel } from "graphql-shortcake";
import client from "./client";
import User from "./User";

export default class Model extends GlobalModel {
  static client = client;

  static hasOperator = true;

  static operator = () => User;

  get changes() {
    const changes = {};

    _.forEach(this.current, (value, key) => {
      const previous = this.previous[key];
      const current = _.isPlainObject(previous)
        ? _.defaultsDeep({}, value, previous)
        : value;
      if (!_.isEqual(previous, current)) changes[key] = current;
    });

    return changes;
  }
}
