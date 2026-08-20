export const logger = {
  info: (message: string, ...optionalParams: any[]) => {
    console.log(`[INFO] [${new Date().toLocaleTimeString()}]: ${message}`, ...optionalParams);
  },
  warn: (message: string, ...optionalParams: any[]) => {
    console.warn(`[WARN] [${new Date().toLocaleTimeString()}]: ${message}`, ...optionalParams);
  },
  error: (message: string, ...optionalParams: any[]) => {
    console.error(`[ERROR] [${new Date().toLocaleTimeString()}]: ${message}`, ...optionalParams);
  },
};

export default logger;
