const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const { signToken, verifyToken } = require('./auth');

const typeDefs = gql`
  type User {
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

  type Query {
    me: User
    userById(id: ID!): User
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return User.findById(user.id);
    },
    userById: (_, { id }) => User.findById(id),
  },
  Mutation: {
    signup: async (_, { input }) => {
      const existing = await User.findOne({ email: input.email });
      if (existing) throw new Error('Email already in use');
      const passwordHash = await bcrypt.hash(input.password, 10);
      const user = await User.create({
        email: input.email,
        passwordHash,
        name: input.name,
      });
      const token = signToken({ id: user._id, email: user.email });
      return { token, user };
    },
    login: async (_, { input }) => {
      const user = await User.findOne({ email: input.email });
      if (!user) throw new Error('Invalid credentials');
      const ok = await bcrypt.compare(input.password, user.passwordHash);
      if (!ok) throw new Error('Invalid credentials');
      const token = signToken({ id: user._id, email: user.email });
      return { token, user };
    },
  },
};

module.exports = { typeDefs, resolvers };
