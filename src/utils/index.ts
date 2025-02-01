/**
 * This file contain the common util
 * functions.
 */

import { LoggerConfig } from "./logger";

/**
 * Returns instance of logger instance.
 */
export const logger = new LoggerConfig("notification.engine", process.env.completeLogPath).getLogger();
