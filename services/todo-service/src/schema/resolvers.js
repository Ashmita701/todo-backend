const Todo = require('../models/Todo');

module.exports = {
  Query: {
    myTodos: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return Todo.find({ ownerId: user.id }).sort({ createdAt: -1 });
    },
    todoById: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const todo = await Todo.findById(id);
      if (!todo) return null;
      if (todo.ownerId.toString() !== user.id) throw new Error('Forbidden');
      return todo;
    },
  },
  Mutation: {
    createTodo: async (_, { input }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const todo = await Todo.create({
        title: input.title,
        description: input.description,
        ownerId: user.id,
      });
      return todo;
    },
    updateTodo: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const todo = await Todo.findById(id);
      if (!todo) throw new Error('Not found');
      if (todo.ownerId.toString() !== user.id) throw new Error('Forbidden');
      if (input.title !== undefined) todo.title = input.title;
      if (input.description !== undefined) todo.description = input.description;
      if (input.done !== undefined) todo.done = input.done;
      await todo.save();
      return todo;
    },
    deleteTodo: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const todo = await Todo.findById(id);
      if (!todo) throw new Error('Not found');
      if (todo.ownerId.toString() !== user.id) throw new Error('Forbidden');
      await todo.deleteOne();
      return true;
    },
  },
  Todo: {
    owner: async (todo, _, { user, fetchUser }) => {
      // In federation, requesting User is done through _entities or resolver of User in gateway.
      // But for simplicity we return reference and let federation resolve it using User key.
      return { __typename: 'User', id: todo.ownerId.toString() };
    },
  },
};
