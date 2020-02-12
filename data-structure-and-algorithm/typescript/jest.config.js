module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverage: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
