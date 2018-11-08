// jest.config.js
module.exports = {
  "coverageReporters": [
    "json", "lcov", "text"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ],
  "verbose": true,
  "moduleFileExtensions": ["js", "jsx"],
  "moduleDirectories": ["node_modules", "src"],
  "modulePaths": ["<rootDir>/test-setup.js"],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "setupTestFrameworkScriptFile": "<rootDir>/test-setup.js",
};
