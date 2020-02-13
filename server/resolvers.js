import UsersQuery from "./query/UsersQuery";
import RegisterByEmailMutation from "./mutation/RegisterByEmailMutation";
import UpdateUserMutation from "./mutation/UpdateUserMutation";
import DelUserMutation from "./mutation/DelUserMutation";
import AddMessageMutation from "./mutation/AddMessageMutation";

const Query = {
  users: UsersQuery
};

const Mutation = {
  registerByEmail: RegisterByEmailMutation,
  updateUser: UpdateUserMutation,
  delUser: DelUserMutation,
  addMessage: AddMessageMutation
};

export default { Query, Mutation };
