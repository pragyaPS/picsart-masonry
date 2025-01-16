export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/test/jest/rtl.setup.ts"],
}