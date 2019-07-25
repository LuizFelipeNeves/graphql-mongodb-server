export default `
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    telephones: [Int]!,
    role: Int
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }

  input CreateUserInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    telephones: [Int]!,
    role: Int
  }
  
  input UpdateUserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    telephones: [Int],
    role: Int
  } 
`;
