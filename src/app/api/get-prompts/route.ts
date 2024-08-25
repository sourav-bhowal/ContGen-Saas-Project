import { db } from "@/lib/db";
import { AIOutput } from "@/schema/schema";
import { eq } from "drizzle-orm";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = userId && await clerkClient.users.getUser(userId);

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user && user.primaryEmailAddress?.emailAddress) {
      // GET PROMPTS
      const prompts = await db.query.AIOutput.findMany({
        where: eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress),
      });
      // return response
      return new Response(JSON.stringify(prompts));
    }
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
