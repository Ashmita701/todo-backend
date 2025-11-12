const { gql } = require('apollo-server-express');

module.exports = gql`
  directive @key(fields: String!) on OBJECT | INTERFACE

  type User @key(fields: "id") {
    id: ID!
    email: String!
    name: String
    createdAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignupInput {
    email: String!
    password: String!
    name: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    me: User
    userById(id: ID!): User
  }

  extend type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;
