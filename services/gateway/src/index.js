import { ApolloServer } from 'apollo-server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'user', url: 'http://user-service:4001/graphql' },
    { name: 'todo', url: 'http://todo-service:4002/graphql' },
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.req && context.req.headers.authorization) {
          request.http.headers.set(
            'authorization',
            context.req.headers.authorization
          );
        } else {
          console.log(' No auth header found in request');
        }
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  context: ({ req }) => ({ req }),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});
