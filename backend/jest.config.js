export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
  globals: {
    NODE_ENV: "test",
  },
  setupFiles: ["dotenv/config"],
  coverageDirectory: "coverage/backend",
  verbose: true,
};
