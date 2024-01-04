export default {
    transform: {
      "^.+\\.ts$": ["@swc/jest"],
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["js", "ts", "svelte"],
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testEnvironment: "jsdom",
    testRegex: ".*.test.ts",
  };