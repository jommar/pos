import { mongo } from "~/server/utils/mongodb";
import jwt from "jsonwebtoken";
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

    // Find user by username
    const user = await db
      .collection("user")
      .findOne({ username: body.username });

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid Credentials",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: "Invalid Credentials",
      });
    }

    const roles = user.roles || [];

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        roles,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    return {
      success: true,
      token,
      roles,
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
