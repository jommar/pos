import { mongo } from "~/server/utils/mongodb";
import bcrypt from "bcrypt";
import { logError } from "~/server/utils/logger";
import { ERRORS } from "~/server/constants";

export default defineEventHandler(async (event) => {
  try {
    const db = await mongo();
    const body = await readBody(event);

    // Validate request body
    if (!body.username || !body.password) {
      throw createError({
        statusCode: 400,
        message: "Username and password are required",
      });
    }

    if (!body.roles) {
      throw createError({
        statusCode: 400,
        message: "Roles are required and must be an array",
      });
    }

    const roles = [body.roles];

    // Check if the username already exists
    const existingUser = await db
      .collection("user")
      .findOne({ username: body.username });

    if (existingUser) {
      throw createError({
        statusCode: 409, // Conflict
        message: ERRORS.USERNAME_EXISTS || "Username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Prepare the new user object
    const newUser = {
      username: body.username,
      password: hashedPassword,
      roles,
      createdAt: new Date(),
    };

    // Insert the new user into the database
    const result = await db.collection("user").insertOne(newUser);

    if (!result.insertedId) {
      throw createError({
        statusCode: 500,
        message: "Failed to register the user",
      });
    }

    return {
      success: true,
      message: "User registered successfully",
      id: result.insertedId,
    };
  } catch (err) {
    const message = err.message || ERRORS.GENERIC;
    logError(message);
    throw createError({
      statusCode: err.statusCode || 500,
      message,
    });
  }
});
