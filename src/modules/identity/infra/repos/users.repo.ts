import { db } from "../../../../db/client.js";
import { users } from "../../../../db/schema/index.js";
import { eq } from "drizzle-orm";

export class UsersRepo {
    static async upsertByAuth(
        provider: string,
        subject: string
    ): Promise<{ id: string }> {
        const [user] = await db
            .insert(users)
            .values({
                authProvider: provider,
                authSubject: subject,
            })
            .onConflictDoUpdate({
                target: [users.authProvider, users.authSubject],
                set: {
                    authSubject: subject, // Dummy update to ensure return working
                },
            })
            .returning({ id: users.id });

        return user;
    }
}
