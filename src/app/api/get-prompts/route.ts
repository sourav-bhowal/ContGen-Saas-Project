import { db } from "@/lib/db";
import { AIOutput } from "@/schema/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  try {
    // GET USER
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (user && user.primaryEmailAddress?.emailAddress) {
      // GET PROMPTS
      const prompts = await db.query.AIOutput.findMany({
        where: eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress),
      });
      // return response
      return new Response(JSON.stringify(prompts));
    }

    return new Response("Unauthorized", { status: 401 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
