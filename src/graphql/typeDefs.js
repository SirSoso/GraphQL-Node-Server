const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    last_name: String!
    email: String!
    role: String!
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    created_by: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterUserInput {
    email: String!
    name: String!
    last_name: String!
    password: String!
  }

  type Query {
    me: User
    courses(page: Int!, limit: Int!): [Course!]!
  }

  type Mutation {
    register(input: RegisterUserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createCourse(title: String!, description: String!): Course
  }
`;

module.exports = {
  typeDefs,
};
