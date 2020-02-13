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

input AddMessageMutationInput {
  conversationId: String!
  content: String!
}

type AddMessageMutationPayload {
  status: ResponseStatus
  message: Message
}

type Mutation {
  registerByEmail(input: RegisterByEmailMutationInput!): RegisterByEmailMutationPayload
  updateUser(input: UpdateUserMutationInput!): UpdateUserMutationPayload
  delUser(input: DelUserMutationInput!): DelUserMutationPayload
  addMessage(input: AddMessageMutationInput!): AddMessageMutationPayload
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
type Message {
  id: String
  user: User
  conversation: Conversation
  content: String
}
`;

export default schema;
