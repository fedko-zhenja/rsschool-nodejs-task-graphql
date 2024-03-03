import { GraphQLEnumType } from 'graphql';
import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLFloat } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';

export const MemberEnumTypeForId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: {
            value: MemberTypeId.BASIC
        },

        business: {
            value: MemberTypeId.BUSINESS
        }
    }
});

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(MemberEnumTypeForId)
        },
        discount: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        postsLimitPerMonth: {
            type: new GraphQLNonNull(GraphQLInt)
        } 
    })
});