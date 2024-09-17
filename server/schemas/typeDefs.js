const typeDefs = `
  type Book {
    bookId: ID!
    title: String
    authors: [String]
    description: String
    image: String
   
  }
  input BookInput {
  bookId: ID!
  title: String!
  authors: [String]!
  description: String!
  image: String
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
    savedBooks: [Book]
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }
      type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

        addBook( book: BookInput!): User
  
    removeBook(book: ID!): User
  }
`;

module.exports = typeDefs;