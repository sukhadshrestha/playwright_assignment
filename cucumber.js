module.exports = {
  default: {
    require: ["project/tests/steps/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["project/tests/features/*.feature"],
    publishQuiet: true,
    format: ["progress"]
  }
};