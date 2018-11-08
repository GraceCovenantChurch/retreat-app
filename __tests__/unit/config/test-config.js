describe("Config", () => {
  beforeEach(() => {
    delete process.env.ENV_CONFIG_PATH;
    jest.resetModules();
  });

  describe("when ENV_CONFIG_PATH is defined", () => {
    test("should use configuration at the defined filepath", () => {
      process.env.ENV_CONFIG_PATH = "../__tests__/unit/config/test-config.default.json";
      expect(require("../../../config/config")).toBe(require("./test-config.default.json"));
    });
  });

  describe("when ENV_CONFIG_PATH is not defined", () => {
    test("should use configuration at the defined filepath", () => {
      expect(require("../../../config/config")).toBe(require("../../../config/config.default.json"));
    });
  });
});
