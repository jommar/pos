import { mongo } from "~/server/utils/mongodb";
import { ObjectId } from "mongodb";
import { logError } from "~/server/utils/logger";
import { ERRORS } from "~/server/constants";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const db = await mongo();

    // Validate that the provided `_id` is a valid ObjectId string
    if (!ObjectId.isValid(body._id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid ID format",
      });
    }

    // Convert `_id` to ObjectId
    const objectId = new ObjectId(body._id);

    const result = await db.collection("items").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Item not found",
      });
    }

    return {
      success: true,
      ...body,
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
