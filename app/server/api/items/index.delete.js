import { mongo } from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const db = await mongo();

    const result = await db.collection("items").deleteOne({ id: body.id });

    if (result.deletedCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Item not found",
      });
    }

    return {
      success: true,
      message: `Item with ID ${body.id} deleted successfully`,
    };
  } catch (error) {
    console.error("Failed to delete item:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
