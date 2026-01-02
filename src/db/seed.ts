import "dotenv/config";
import { db } from "./client.js";
import { tenants, organizations } from "./schema/index.js";
import { eq } from "drizzle-orm";

async function main() {
    console.log("Seeding...");

    // Seed default tenant
    const existingTenant = await db.query.tenants.findFirst({
        where: eq(tenants.code, "default"),
    });

    let tenantId: string;
    if (!existingTenant) {
        const [newTenant] = await db
            .insert(tenants)
            .values({
                code: "default",
                name: "Default Tenant",
            })
            .returning();
        tenantId = newTenant.id;
        console.log("Created default tenant");
    } else {
        tenantId = existingTenant.id;
        console.log("Default tenant exists");
    }

    // Seed Orgs
    const orgsToSeed = [
        { code: "CIV", name: "Civilian" },
        { code: "PD", name: "Police Department" },
        { code: "EMS", name: "Emergency Medical Services" },
        { code: "FD", name: "Fire Department" },
        { code: "DISPATCH", name: "Dispatch" },
    ];

    for (const orgData of orgsToSeed) {
        const existingOrg = await db.query.organizations.findFirst({
            where: (t, { eq, and }) =>
                and(eq(t.tenantId, tenantId), eq(t.code, orgData.code)),
        });

        if (!existingOrg) {
            await db.insert(organizations).values({
                tenantId,
                code: orgData.code,
                name: orgData.name,
                orgType: "public",
            });
            console.log(`Created org: ${orgData.code}`);
        }
    }

    console.log("Seeding complete.");
    process.exit(0);
}

main().catch((err) => {
    console.error("Seeding failed", err);
    process.exit(1);
});
