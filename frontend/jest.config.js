module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.svg$": "jest-transform-stub",
  },
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
