module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/packages/**/__tests__/**/*test.[jt]s?(x)'],
};