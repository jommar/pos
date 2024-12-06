import fs from "fs";
import path from "path";

const logDirPath = path.resolve("../logs");
const logFilePath = path.join(logDirPath, "app.log");

// Ensure log directory exists
if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath, { recursive: true }); // Create directory if it doesn't exist
}

/**
 * Logs a message to a file with a timestamp and log level.
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} message - The message to log
 */
export const logger = (level, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;

  // Write the log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error("Failed to write to log file:", err);
  });

  // Optionally, also log to the console for development
  if (process.env.NODE_ENV !== "production") console.log(logMessage);
};

/**
 * Helper functions for different log levels
 */
export const logInfo = (message) => logger("INFO", message);
export const logWarn = (message) => logger("WARN", message);
export const logError = (message) => logger("ERROR", message);
