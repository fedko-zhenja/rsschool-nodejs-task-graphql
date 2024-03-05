/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import { UserType } from './userType.js';
import { PostType } from './postType.js';
import { MemberType } from './memberType.js';
import { ProfileType } from './profileType.js';
import { MemberEnumTypeForId } from './memberType.js';
import { UUIDType } from './uuid.js';
import { Post_create } from './postType.js';
import { Post_change } from './postType.js';
import { Profile_change } from './profileType.js';
import { Profile_create } from './profileType.js';
import { User_create } from './userType.js';
import { User_change } from './userType.js';

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

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({
    createPost: {
      type: PostType,
      args: { 
        dto: {
          type: new GraphQLNonNull(Post_create),
        }
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.post.create({ data: args.dto })
      }
    },

    changePost: {
      type: PostType,
      args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          },
          dto: {
            type: new GraphQLNonNull(Post_change),
          },
      },
      resolve(parent, { id, dto }, ctx) {
        return ctx.prisma.post.update({ where: { id }, data: dto })
      }
    },

    deletePost: {
      type: new GraphQLNonNull(UUIDType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: async (parent, { id }, ctx) => {
        const res = await ctx.prisma.post.delete({ where: { id } });

        return res.id;
      }
    },

    // ------------------------------------------

    createProfile: {
      type: ProfileType,
      args: { 
        dto: {
          type: new GraphQLNonNull(Profile_create),
        }
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.profile.create({ data: args.dto })
      }
    },

    changeProfile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(Profile_change),
        },
      },
      resolve(parent, { id, dto }, ctx) {
        return ctx.prisma.profile.update({ where: {id}, data: dto })
      }
    },

    deleteProfile: {
      type: new GraphQLNonNull(UUIDType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: async (parent, { id }, ctx) => {
        const res = await ctx.prisma.profile.delete({ where: { id } });

        return res.id;
      }
    },

    // -------------------------------

    createUser: {
      type: UserType,
      args: { 
        dto: {
          type: new GraphQLNonNull(User_create),
        }
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.user.create({ data: args.dto })
      }
    },

    changeUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(User_change),
        },
      },
      resolve(parent, { id, dto }, ctx) {
        return ctx.prisma.user.update({ where: {id}, data: dto })
      }
    },

    deleteUser: {
      type: new GraphQLNonNull(UUIDType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: async (parent, { id }, ctx) => {
        const res = await ctx.prisma.user.delete({ where: { id } })

        return res.id;
      }
    },

    // -----------------------------------------

    subscribeTo: {
      type: UserType,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        }
      },
      resolve: async (parent, { userId, authorId }, ctx) => {
        await ctx.prisma.subscribersOnAuthors.create({data: {subscriberId: userId, authorId }, include: { author: true }});
      }
    },

    unsubscribeFrom: {
      type: GraphQLInt,
      args: {
        userId: {
          type: UUIDType,
        },
        authorId: {
          type: UUIDType,
        }
      },
      resolve: async (parent, { userId, authorId }, ctx) => {
        await ctx.prisma.subscribersOnAuthors.deleteMany({where: {subscriberId: userId, authorId }});
      }
    }

  })

});

export const schemaGQL = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});