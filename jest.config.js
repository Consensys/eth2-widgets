module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "\\eth2-simulator": "<rootDir>/src/__mocks__/Eth2SimulatorMock.ts",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.ts"
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