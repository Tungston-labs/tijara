module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-navigation" +
      "|@react-navigation" +
      "|react-redux" +
      ")/)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};

