"use server";
import { db } from "@/lib/db";
import { AIOutput } from "@/schema/schema";

// intreface of SavePromptInDB
interface SavePromptInDBProps {
  userData: FormData;
  templateSlug: string;
  aiResponse: string;
  email: string;
}

// SAVE PROMPT IN DB
export async function SavePromptInDB({
  userData,
  templateSlug,
  aiResponse,
  email,
}: SavePromptInDBProps) {
  // SAVE PROMPT IN DB
  await db.insert(AIOutput).values({
    templateSlug: templateSlug,
    formData: JSON.stringify(userData),
    aiResponse: aiResponse,
    createdBy: email,
  });
}
