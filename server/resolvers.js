import UsersQuery from "./query/UsersQuery";
import RegisterByEmailMutation from "./mutation/RegisterByEmailMutation";
import UpdateUserMutation from "./mutation/UpdateUserMutation";
import DelUserMutation from "./mutation/DelUserMutation";

const Query = {
  users: UsersQuery
};

const Mutation = {
  registerByEmail: RegisterByEmailMutation,
  updateUser: UpdateUserMutation,
  delUser: DelUserMutation
};

export default { Query, Mutation };
