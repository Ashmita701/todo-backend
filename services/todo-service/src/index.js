require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const mongoose = require('mongoose');
const cors = require('cors');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { verifyToken } = require('./auth');

const PORT = process.env.PORT || 4002;

async function start() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    context: ({ req }) => {
      const auth = req.headers.authorization || '';
      const token = auth
      const user =  verifyToken(token) ;
      return { user, req };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.get('/', (req, res) => res.send('Todo service'));

  app.listen(PORT, () => {
    console.log(
      `Todo service ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

start().catch((err) => {
  process.exit(1);
});
