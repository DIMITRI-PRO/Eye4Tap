module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.svg$": "jest-transform-stub",
  },
  testMatch: ["**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/src/assets/"],
  coveragePathIgnorePatterns: ["/node_modules/", "/src/assets/"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  coverageDirectory: "coverage",
};
