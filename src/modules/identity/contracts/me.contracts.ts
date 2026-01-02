import { z } from "zod";

export const MeResponseSchema = z.object({
    userId: z.string().uuid(),
    tenantId: z.string().uuid(),
    tenantCode: z.string(),
    activeCharacterId: z.string().uuid().nullable(),
});

export const CharactersListResponseSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            firstName: z.string(),
            lastName: z.string(),
        })
    ),
});

export const MembershipsListResponseSchema = z.object({
    items: z.array(
        z.object({
            membershipId: z.string(),
            characterId: z.string(),
            organizationId: z.string(),
            organizationCode: z.string(),
            organizationName: z.string(),
            rankCode: z.string().nullable(),
            statusCode: z.string(),
        })
    ),
});

export type MeResponse = z.infer<typeof MeResponseSchema>;
export type CharactersListResponse = z.infer<typeof CharactersListResponseSchema>;
export type MembershipsListResponse = z.infer<typeof MembershipsListResponseSchema>;
