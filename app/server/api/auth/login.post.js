import { mongo } from "~/server/utils/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        expiresIn: "10h",
      }
    );

    return {
      success: true,
      token,
      roles,
    };
  } catch (err) {
    // Log unexpected errors for debugging
    console.error(err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error",
    });
  }
});
