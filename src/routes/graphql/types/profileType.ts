import { GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType, GraphQLBoolean, GraphQLInt  } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberEnumTypeForId } from './memberType.js';

export const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType)
        },
        isMale: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        yearOfBirth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        userId: {
            type: new GraphQLNonNull(UUIDType)
        },
        memberTypeId: {
            type: new GraphQLNonNull(MemberEnumTypeForId)
        },
    })
});

export const ProfileTypePATCH = new GraphQLInputObjectType({
    name: 'ProfileTypePATCH',
    fields: () => ({
        isMale: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        yearOfBirth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        memberTypeId: {
            type: new GraphQLNonNull(MemberEnumTypeForId)
        },
    })
})

export const ProfileTypePOST = new GraphQLInputObjectType({
    name: 'ProfileTypePOST',
    fields: () => ({
        isMale: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        yearOfBirth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        userId: {
            type: new GraphQLNonNull(UUIDType)
        },
        memberTypeId: {
            type: new GraphQLNonNull(MemberEnumTypeForId)
        },
    })
})