import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInputObjectType  } from 'graphql';
import { UUIDType } from './uuid.js';

export const PostType = new GraphQLObjectType({
    name: 'Post',
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

export const Post_change = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
    })
})

export const Post_create = new GraphQLInputObjectType({
    name: 'CreatePostInput',
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