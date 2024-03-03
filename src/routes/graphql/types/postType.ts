import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInputObjectType  } from 'graphql';
import { UUIDType } from './uuid.js';

export const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: new GraphQLNonNull(UUIDType)
        },
    })
});

export const PostTypePATCH = new GraphQLInputObjectType({
    name: 'PostTypePATCH',
    fields: () => ({
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
})

export const PostTypePOST = new GraphQLInputObjectType({
    name: 'PostTypePOST',
    fields: () => ({
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: new GraphQLNonNull(UUIDType)
        },
    })
})