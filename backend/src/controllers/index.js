import FileSystem from "../utils/FileSystem.js";

const { getIndexDirectory, loadModules } = FileSystem;

const directory = getIndexDirectory(import.meta.url);

export default await loadModules(directory);
