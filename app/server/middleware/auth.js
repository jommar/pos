import jwt from "jsonwebtoken";
import cookie from "cookie";

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname;
  const method = event.node.req.method;

  console.log(`New request to: ${method} ${url}`);

  // Define public routes that don't require authentication
  const publicRoutes = ["/api/auth/login", "/api/auth/logout", "/api/register"];

  // Allow public routes to proceed without authentication
  if (publicRoutes.includes(url)) {
    return;
  }

  // Parse cookies from the request header
  const cookies = cookie.parse(event.node.req.headers.cookie || "");
  const token = cookies?.auth_token;

  if (!token) {
    console.error("Invalid token");
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded token to the event context for use in handlers
    event.context.auth = decoded;
  } catch (err) {
    console.error(err.message);
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
});
