import { GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType, GraphQLBoolean, GraphQLInt  } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberEnumTypeForId } from './memberType.js';
import { MemberType } from './memberType.js';
import { Profile } from "@prisma/client";
import { Context } from './interface.js';

export const ProfileType = new GraphQLObjectType<Profile, Context>({
    name: 'Profile',
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
        memberType: {
            type: new GraphQLNonNull(MemberType),
            resolve (parent, args, ctx) {
                return ctx.prisma.memberType.findUnique({ where: { id: parent.memberTypeId } });
              },
        }
    })
});

// export const ProfileTypePATCH = new GraphQLInputObjectType({
//     name: 'ProfileTypePATCH',
//     fields: () => ({
//         isMale: {
//             type: new GraphQLNonNull(GraphQLBoolean)
//         },
//         yearOfBirth: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         memberTypeId: {
//             type: new GraphQLNonNull(MemberEnumTypeForId)
//         },
//     })
// })

// export const ProfileTypePOST = new GraphQLInputObjectType({
//     name: 'ProfileTypePOST',
//     fields: () => ({
//         isMale: {
//             type: new GraphQLNonNull(GraphQLBoolean)
//         },
//         yearOfBirth: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         userId: {
//             type: new GraphQLNonNull(UUIDType)
//         },
//         memberTypeId: {
//             type: new GraphQLNonNull(MemberEnumTypeForId)
//         },
//     })
// })