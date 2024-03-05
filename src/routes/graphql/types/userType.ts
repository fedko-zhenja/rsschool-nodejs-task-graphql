import { GraphQLList, GraphQLObjectType, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType, GraphQLString, GraphQLInt  } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profileType.js';
import { PostType } from './postType.js';
import { User } from "@prisma/client";
import { Context } from './interface.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType<User, Context>({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat)
        },

        profile: {
            type: ProfileType,
            resolve (parent, args, ctx) {
                return ctx.prisma.profile.findUnique({ where: { userId: parent.id } });
            },
        },

        posts: {
            type: new GraphQLList(PostType) ,
            resolve (parent, args, ctx) {
                return ctx.prisma.post.findMany({ where: { authorId: parent.id } });
            },
        },

        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async (parent, args, ctx) => {
                const res = (await ctx.prisma.subscribersOnAuthors.findMany({ where: { subscriberId: parent.id }, select: { author: true } })).map(({ author }) => author);

                return res;
            } 
        },

        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async (parent, args, ctx) => {
                const res = (await ctx.prisma.subscribersOnAuthors.findMany({ where: { authorId: parent.id }, select: { subscriber: true } })).map(({ subscriber }) => subscriber);

                return res;
            } 
        }
    })
});

export const User_create = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    })
})

export const User_change = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        }
    })
})