"use server";

import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function createSubmission(data: {
    creditedName: string;
    isAdult: boolean | null;
    guardianName: string;
    clipLink: string;
    description: string;
    selfFilmed: boolean | null;
    wantsCredit: boolean | null;
}) {
    try {
        const submission = await prisma.submission.create({
            data: {
                creditedName: data.creditedName || "Anonymous",
                ageGateStatus: data.isAdult ? "adult" : "guardian-consented",
                guardianName: data.guardianName || null,
                clipLink: data.clipLink,
                description: data.description || null,
                selfFilmed: data.selfFilmed ?? false,
                wantsCredit: data.wantsCredit ?? false,
                ruleAcknowledgments: true,
            },
        });
        return { success: true, id: submission.id };
    } catch (error) {
        console.error("Submission Error:", error);
        return { success: false, error: "Failed to submit clip." };
    }
}
