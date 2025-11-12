const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../auth');

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return User.findById(user.id);
    },
    userById: async (_, { id }) => {
      const user = await User.findById(id);
      return user; // return the actual result, not the query object
    },
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
  // Federation requires a _resolveReference when other services request User
  User: {
    __resolveReference: async (reference) => {
      return User.findById(reference.id);
    },
  },
};
