module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "\\eth2-calculator": "<rootDir>/src/__mocks__/Eth2CalculatorMock.ts"
  },
  coverageThreshold: {
    "global": {
      "statements": 85,
      "branches": 85,
      "functions": 85,
      "lines": 85
    }
  }
};