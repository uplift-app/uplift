export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
