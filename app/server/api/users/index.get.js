import { mongo } from "~/server/utils/mongodb";
import { logError } from "~/server/utils/logger";
import { ERRORS } from "~/server/constants";

export default defineEventHandler(async () => {
  try {
    const db = await mongo();

    const users = await db
      .collection("user")
      .find({ roles: { $ne: "superadmin" } })
      .toArray();

    return {
      success: true,
      users,
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
