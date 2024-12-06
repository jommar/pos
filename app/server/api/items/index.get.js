import { mongo } from "~/server/utils/mongodb";
import { logError } from "~/server/utils/logger";
import { ERRORS } from "~/server/constants";

export default defineEventHandler(async () => {
  try {
    const db = await mongo();

    const items = await db.collection("items").find().toArray();

    return {
      success: true,
      items,
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
