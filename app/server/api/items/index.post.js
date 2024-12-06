import { ERRORS } from "~/server/constants";
import { logError } from "~/server/utils/logger";
import { mongo } from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.quantity || !body.price) {
    throw createError({
      statusCode: 400,
      statusMessage: "Item name, quantity, and price are required",
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
    const message = error.message || ERRORS.GENERIC;
    logError(message);
    throw createError({
      statusCode: 500,
      statusMessage: message,
    });
  }
});
