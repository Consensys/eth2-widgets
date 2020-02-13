module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "\\eth2-simulator": "<rootDir>/src/__mocks__/Eth2SimulatorMock.ts",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.ts"
  },
  coverageThreshold: {
    "global": {
      "statements": 70,
      "branches": 70,
      "functions": 70,
      "lines": 70
    }
  }
};