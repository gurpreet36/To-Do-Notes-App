/**
 * This file contains the code required
 * to initialize and export logger.
 */
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { EOL } from "os";

export interface ICustomLogger extends winston.Logger {
    logStream?: any;
}

export class LoggerConfig {
    private logger: ICustomLogger;

    private defaultTransportOpts: DailyRotateFile.GeneralDailyRotateFileTransportOptions = {
        datePattern: "YYYY-MM-DD",
        handleExceptions: true,
        json: false,
        maxFiles: "7d",
        zippedArchive: true,
    };


    private logTypes: string[] = ["error", "info"];

    constructor(private serviceIdentifier: string, private logDirectory: string) {
        this.logger = this.createLogger();

        this.logger.logStream = {
            write: (text: string) => {
                this.logger.info(text);
            },
        };
    }

    public getLogger(): ICustomLogger {
        return this.logger;
    }

    private createLogger(): ICustomLogger {
        const transports: any = new Array(new winston.transports.Console());

        this.logTypes.forEach((logType: string) => {
            const filename = `${this.serviceIdentifier}.${logType}.%DATE%.log`;

            const transport = this.createTransport({ dirname: this.logDirectory, filename, level: logType });

            transports.push(transport);
        });

        const myFormat = winston.format.printf((info) => {
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${EOL} ${info.stack || ''}`;
        });

        return winston.createLogger({
            exitOnError: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json(), myFormat),
            transports,
        });
    }

    private createTransport(opts: any) {
        return new DailyRotateFile({
            ...this.defaultTransportOpts,
            ...opts,
        });
    }
}

export enum LogLevel {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Debug = "debug",
    Verbose = "verbose",
}
