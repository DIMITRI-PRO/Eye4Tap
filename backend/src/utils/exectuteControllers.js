import { Router } from "express";
import log from "../services/logger.js";

const { loggingError } = log;

const executeControllers = (obj, router, index = 0) => {
  const result = obj;

  Object.entries(result).forEach(([key, value]) => {
    const keyValue = value;

    if (
      result?.routeName &&
      key.includes("Controllers") &&
      typeof value === "function"
    ) {
      const allCurrentRoutes = result[key](Router());
      router.use(`/${result.routeName}`, allCurrentRoutes);
    }

    if (typeof value === "object") {
      keyValue.routeName = key;
      keyValue.index = index;

      if (
        index === 0 &&
        keyValue.routeName === keyValue.routeName.toLowerCase()
      ) {
        executeControllers(result[key], router, index + 1);
      } else {
        loggingError(
          "Controllers generation status - [Failed] : ",
          `the folder named ${key} have to be on lower case...`
        );
      }
    }
  });
};

export default {
  executeControllers,
};
