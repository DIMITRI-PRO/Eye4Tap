import fs from "fs";
import path, { dirname } from "path";
import url, { fileURLToPath } from "url";
import log from "../services/logger.js";

const { loggingError } = log;

const getIndexDirectory = (urlFile) => {
  const __filename = fileURLToPath(urlFile);
  const __dirname = dirname(__filename);

  const subDirs = fs
    .readdirSync(__dirname, { withFileTypes: true, encoding: "utf-8" })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return { subDirs, dirName: __dirname };
};

const loadModules = async ({ subDirs, dirName }, callback, targetFile) => {
  const models = {};

  const promises = subDirs.map(async (subDir) => {
    try {
      const indexPath = path.join(dirName, subDir, targetFile || "index.js");
      const indexPathUrl = url.pathToFileURL(indexPath);
      const module = await import(indexPathUrl.href);
      models[subDir] = module.default;
      const Manager = models[subDir];

      callback?.({ Manager, subDir, indexPathUrl });
    } catch (err) {
      loggingError(
        `[Export: Failed] or [MissingFile: ${targetFile}]`,
        ` ${dirName}\\${subDir}`
      );
    }
  });

  await Promise.all(promises);

  return models;
};

export default {
  getIndexDirectory,
  loadModules,
};
