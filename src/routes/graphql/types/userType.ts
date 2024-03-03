import { GraphQLList, GraphQLObjectType, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType, GraphQLString  } from 'graphql';
import { UUIDType } from './uuid.js';
// import { MemberEnumTypeForId } from './memberType.js';
import { ProfileType } from './profileType.js';
import { PostType } from './postType.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'UserType',
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
        },

        posts: {
            type: PostType,
        },

        userSubscribedTo: {
            type: new GraphQLList(SubscribersOnAuthorsType),
        },

        subscribedToUser: {
            type: new GraphQLList(SubscribersOnAuthorsType),
        }
    })
});

export const SubscribersOnAuthorsType = new GraphQLObjectType({
    name: 'SubscribersOnAuthorsType',
    fields: () => ({
        subscriber: { 
            type:  UserType
        },
        author: { 
            type: UserType
        }
    })
});

export const UserTypePATCH = new GraphQLInputObjectType({
    name: 'UserTypePATCH',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    })
})

export const UserTypePOST = new GraphQLInputObjectType({
    name: 'UserTypePOST',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    })
})