const schema = `
input RegisterByEmailMutationInput {
  email: String!
  password: String!
}

type RegisterByEmailMutationPayload {
  status: ResponseStatus
  user: User
}

input UpdateUserMutationInput {
  userId: String!
  email: String
}

type UpdateUserMutationPayload {
  status: ResponseStatus
  user: User
}

input DelUserMutationInput {
  userId: String!
}

type DelUserMutationPayload {
  status: ResponseStatus
  user: User
}

type Mutation {
  registerByEmail(input: RegisterByEmailMutationInput!): RegisterByEmailMutationPayload
  updateUser(input: UpdateUserMutationInput!): UpdateUserMutationPayload
  delUser(input: DelUserMutationInput!): DelUserMutationPayload
}

type Query {
  users: [User]
}

enum ResponseStatus {
  failed
  ok
}

type User {
  id: String
  email: String
  isAdmin: Boolean
}
`;

export default schema;
