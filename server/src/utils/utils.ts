const isDevelopment = process.env.NODE_ENV === "development"; 

export const Logger = {
  log: (...inputs: any[]) => {
      if (isDevelopment) {
          console.log(...inputs);
        }
    },
    error: (...inputs: any[]) => {
    if (isDevelopment) {
      console.error(...inputs);
    }
  },
  warn: (...inputs: any[]) => {
    if (isDevelopment) {
      console.warn(...inputs);
    }
  }
}