require('dotenv').config();
const logger = require('./utils/logger');
const fastify = require('fastify');
const { ApolloServer } = require('apollo-server-fastify');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const dbConnection = require('./config/connection');

const app = fastify({ logger });

const PORT = process.env.PORT || 3001;

app.get('/', () => ({success: true}))

function fastifyAppClosePlugin(app) {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  playground: true,
  introspection: true,
  plugins: [
    fastifyAppClosePlugin(app),
    ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
  ],
});

async function startApolloServer(typeDefs, resolvers) {
  await server.start();
  app.register(server.createHandler({ path: '/graphql', }));
  await dbConnection;
  await app.listen(PORT);
  logger.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer();