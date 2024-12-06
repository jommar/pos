import { mongo } from "~/server/utils/mongodb";
import { logError } from "~/server/utils/logger";
import { ERRORS } from "~/server/constants";
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    const db = await mongo();

    const item = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });

    return {
      success: true,
      item,
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
