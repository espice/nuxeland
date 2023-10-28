const { join } = require("path");
const { generate } = require("@genql/cli");
const { watch } = require("chokidar");
const { schema } = require("../../packages/backend/dist/graphql/schema");
const { printSchema } = require("graphql");

const schemaDir = join(
  __dirname,
  "../../packages/backend/dist/graphql/schema/"
);
const output = join(__dirname, "genql");

let timeoutId;
const generateGenql = async () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    await generate({
      schema: printSchema(schema),
      output,
    });
    console.log("- \u001b[35mevent\u001b[0m generated genql sdk");
  }, 1000);
};

generateGenql();

// watch & regen genql sdk in dev environment
if (process.argv[2] === "--dev") {
  watch(schemaDir).on("change", async () => {
    await generateGenql();
  });
}
