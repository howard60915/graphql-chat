module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/?(*.)(spec|test).js?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/__mocks__/index.js"],
  snapshotSerializers: ["<rootDir>/node_modules/graphql-shortcake/serializer"],
  coveragePathIgnorePatterns: ["/node_modules/", "/migrations/", "/__tests__/"]
};
