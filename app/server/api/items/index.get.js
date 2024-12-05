import { mongo } from "~/server/utils/mongodb";

export default defineEventHandler(async () => {
  try {
    const db = await mongo();

    const items = await db.collection("items").find().toArray();

    return {
      success: true,
      items,
    };
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
