export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
    },
    setupfilesAfterEnv: ["<rootDir>/src/test/jest/rtl.setup.ts"],
}