import UsersQuery from "./query/UsersQuery";
import RegisterByEmailMutation from "./mutation/RegisterByEmailMutation";
import UpdateUserMutation from "./mutation/UpdateUserMutation";
import DelUserMutation from "./mutation/DelUserMutation";
import AddMessageMutation from "./mutation/AddMessageMutation";
import AddConversationMutation from "./mutation/AddConversationMutation";
import OnMessage from "./subscription/OnMessage";

const Query = {
  users: UsersQuery
};

const Mutation = {
  registerByEmail: RegisterByEmailMutation,
  updateUser: UpdateUserMutation,
  delUser: DelUserMutation,
  addMessage: AddMessageMutation,
  addConversation: AddConversationMutation
};

const Subscription = { onMessage: OnMessage };

export default { Query, Mutation, Subscription };
