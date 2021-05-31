module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["html"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};