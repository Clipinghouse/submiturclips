"use server";

import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any); // Type cast in case of mismatch
const prisma = new PrismaClient({ adapter });

export async function createSubmission(data: {
    creditedName: string;
    email: string;
    isAdult: boolean | null;
    clipLink: string;
    description: string;
    selfFilmed: boolean | null;
    isEdited: boolean | null;
    sourceChannel: string | null;
}) {
    try {
        const submission = await prisma.submission.create({
            data: {
                creditedName: data.creditedName || "Anonymous",
                email: data.email,
                ageGateStatus: data.isAdult ? "true" : "false",
                clipLink: data.clipLink,
                description: data.description || null,
                selfFilmed: data.selfFilmed ?? false,
                isEdited: data.isEdited,
                sourceChannel: data.sourceChannel,
                ruleAcknowledgments: true,
            },
        });
        return { success: true, id: submission.id };
    } catch (error: any) {
        console.error("Submission Error:", error);
        return { success: false, error: "Failed to submit clip.", details: String(error?.message || error) };
    }
}
