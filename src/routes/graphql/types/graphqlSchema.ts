/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from './userType.js';
import { PostType } from './postType.js';
import { MemberType } from './memberType.js';
import { ProfileType } from './profileType.js';
import { MemberEnumTypeForId } from './memberType.js';
import { UUIDType } from './uuid.js';

export const RootQueryType = new GraphQLObjectType({
    name: 'Query',

    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args, ctx) {
                return ctx.prisma.user.findMany();
            }
        },
        user: {
          type: UserType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve(parent, args, ctx) {
            return ctx.prisma.user.findUnique({ where: { id: args.id } });
          },
        },

        // ----------------

        profiles: {
            type: new GraphQLList(ProfileType),
            resolve(parent, args, ctx) {
                return ctx.prisma.profile.findMany();
            }
        },
        profile: {
          type: ProfileType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve(parent, args, ctx) {
            return ctx.prisma.profile.findUnique({ where: { id: args.id } });
          },
        },

        // ------------------

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args, ctx) {
                return ctx.prisma.post.findMany();
            }
        },
        post: {
          type: PostType,
          args: {
            id: { type: new GraphQLNonNull(UUIDType) },
          },
          resolve(parent, args, ctx) {
            return ctx.prisma.post.findUnique({ where: { id: args.id } });
          },
        },

        // ------------------

        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: (parent, args, ctx) => {
              return ctx.prisma.memberType.findMany();
            },
          },
        memberType: {
          type: MemberType,
          args: {
            id: { type: new GraphQLNonNull(MemberEnumTypeForId) },
          },
          resolve(parent, args, ctx) {
            return ctx.prisma.memberType.findUnique({ where: { id: args.id } });
          },
        },
    })
  });

// const RootMutationType = new GraphQLObjectType({});

export const schemaGQL = new GraphQLSchema({
    query: RootQueryType,
});