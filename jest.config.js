module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: false,
  testMatch: ['<rootDir>/src/*.__test__.ts'],
};
