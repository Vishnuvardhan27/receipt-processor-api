module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,ts}', 
      '!coverage/**',
      '!**/node_modules/**',
    ],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/coverage/'
    ],
  };
  