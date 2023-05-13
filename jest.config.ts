import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/$1",
  },
};

export default config;
