import { mongo } from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.quantity || !body.price) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data. Name, quantity, and price are required.",
    });
  }

  try {
    const db = await mongo();

    const result = await db.collection("items").insertOne(body);
    const insertedItem = { ...body, id: result.insertedId };

    return {
      success: true,
      item: insertedItem,
    };
  } catch (error) {
    console.error("Failed to insert item:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
