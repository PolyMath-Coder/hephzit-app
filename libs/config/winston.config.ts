import path from "path";
import * as winston from "winston";



const options = {
    file: {
      level: "info",
      filename: `${path.resolve(__dirname)}/logs/${new Date()})}.log`,
      handleExceptions: true,
      maxsize: 20971520, // 20MB
      maxFiles: 10,
      colorize: false,
    },
    console: {
      name: "console.info",
      level: "debug",
      handleExceptions: true,
      colorize: true,
    },
  };
  

export const winstonConfig = {
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console),
    ],
    exitOnError: false,
  };
  
  const winstonMorganLogger = winston.createLogger({
    transports: [new winston.transports.File(options.file)],
    exitOnError: false,
  });
  export const winstonMorganFileWriter = {
    write: (msg: string) => {
      winstonMorganLogger.info(msg);
    },
  };