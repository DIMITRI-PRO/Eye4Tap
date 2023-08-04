const executeControllers = (obj, router) => {
  Object.keys(obj).forEach((key) => {
    if (key.includes("Controllers") && typeof obj[key] === "function")
      obj[key](router);

    if (typeof obj[key] === "object") executeControllers(obj[key], router);
  });
};

export default {
  executeControllers,
};
