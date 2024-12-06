export const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/register",
  "/login",
  "/logout",
  "/register",
];

export const ERRORS = {
  NO_TOKEN: "Invalid token",
  UNAUTHORIZED: "Unauthorized",
  GENERIC: "An internal server error occurred. Please contact support.",
  DB_CONN: "MongoDB connection details are missing in runtime config",
};