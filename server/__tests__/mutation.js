export default function(req) {
  return {
    registerByEmail: req(`
      mutation($input: RegisterByEmailMutationInput!) {
        registerByEmail(input: $input) { status user { id email } }
      }
    `),
    updateUser: req(`
      mutation($input: UpdateUserMutationInput!) {
        updateUser(input: $input) { status user { id } }
      }
    `),
    delUser: req(`
      mutation($input: DelUserMutationInput!) {
        delUser(input: $input) { status user { id } }
      }
    `),
    addConversation: req(`
      mutation($input: AddConversationMutationInput!) {
        addConversation(input: $input) {
          status
          conversation { name }
        }
      }
    `),
    addMessage: req(`
      mutation($input: AddMessageMutationInput!) {
        addMessage(input: $input) {
          status
          message {
            content
            user { id }
          }
        }
      }
    `)
  };
}
