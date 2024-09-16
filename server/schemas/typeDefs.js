const typeDefs = `
  type Book {
    title: String
    author: String
    description: String
    # add any other fields that your Book schema contains
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }
      type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

        addBook(userId: ID!, book: String!): User
  
    removeBook(book: String!): User
  }
`;

module.exports = typeDefs;