import jwt from "jsonwebtoken";
import cookie from "cookie";
import { ERRORS, PUBLIC_ROUTES } from "~/server/constants";
import { logError } from "~/server/utils/logger";

export default defineEventHandler((event) => {
  try {
    if (!process.env.JWT_SECRET) {
      logError("JWT_SECRET is not defined in the environment variables");
      throw new Error(ERRORS.GENERIC);
    }

    const url = getRequestURL(event).pathname;

    // Allow public routes to proceed without authentication
    if (PUBLIC_ROUTES.includes(url)) return;
    // Parse cookies from the request header
    const cookies = cookie.parse(event.node.req.headers.cookie || "");
    const token = cookies?.auth_token;

    if (!token) throw new Error(ERRORS.NO_TOKEN);

    // Verify the token using your secret
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const message = err.message || ERRORS.UNAUTHORIZED;
    logError(message);
    throw createError({
      statusCode: 401,
      message,
    });
  }
});
