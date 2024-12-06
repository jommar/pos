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

    body.price = parseFloat(body.price);
    body.quantity = parseInt(body.quantity);

    // Check if an item with the same name and barcode exists
    const existingItem = await db.collection("items").findOne({
      name: body.name,
      barcode: body.barcode,
    });

    if (existingItem) {
      const updates = {
        $inc: { quantity: body.quantity }, // Add to the existing quantity
      };

      if (existingItem.currentPrice !== body.price) {
        // If price has changed, update currentPrice and push to priceHistory
        updates.$set = { currentPrice: body.price };
        updates.$push = {
          priceHistory: {
            price: body.price,
            date: new Date(),
          },
        };
      }

      // Update the existing item
      await db
        .collection("items")
        .updateOne({ _id: existingItem._id }, updates);

      return {
        success: true,
        message: "Item updated successfully",
        item: {
          id: existingItem._id,
          ...existingItem,
          quantity: existingItem.quantity + body.quantity,
          currentPrice: body.price,
          priceHistory:
            existingItem.currentPrice !== body.price
              ? [
                  ...existingItem.priceHistory,
                  { price: body.price, date: new Date() },
                ]
              : existingItem.priceHistory,
          updatedAt: new Date(),
        },
      };
    } else {
      // Insert new item if it doesn't exist
      const result = await db.collection("items").insertOne({
        name: body.name,
        quantity: body.quantity,
        currentPrice: body.price,
        barcode: body.barcode,
        priceHistory: [
          {
            price: body.price,
            date: new Date(),
          },
        ],
        updatedAt: new Date(),
      });

      const insertedItem = { ...body, id: result.insertedId };

      return {
        success: true,
        item: insertedItem,
      };
    }
  } catch (error) {
    const message = error.message || ERRORS.GENERIC;
    logError(message);
    throw createError({
      statusCode: 500,
      statusMessage: message,
    });
  }
});
