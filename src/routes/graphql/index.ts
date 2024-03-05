import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import { schemaGQL } from './types/graphqlSchema.js';
import { createContext } from './types/createContext.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { query, variables } = req.body;
      const { prisma } = fastify;

      const errValue = validate(schemaGQL, parse(query), [depthLimit(5)]);

      if (errValue.length) {

        const resErr = {
          errors: errValue,
        }

        return resErr;
      }

      const result = await graphql({
          schema: schemaGQL,
          source: query,
          variableValues: variables,
          contextValue: createContext(prisma),
      });
      return result;
    }
  });
};

export default plugin;
