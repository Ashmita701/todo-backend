const { gql } = require('apollo-server-express');

module.exports = gql`
  directive @key(fields: String!) on OBJECT | INTERFACE

  type Todo {
    id: ID!
    title: String!
    description: String
    done: Boolean!
    owner: User
    ownerId: ID!
    createdAt: String
  }

  # minimal User shape for federation reference
  type User @key(fields: "id") {
    id: ID!
    email: String
    name: String
  }

  input CreateTodoInput {
    title: String!
    description: String
  }

  input UpdateTodoInput {
    title: String
    description: String
    done: Boolean
  }

  extend type Query {
    myTodos: [Todo!]!
    todoById(id: ID!): Todo
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean
  }
`;
