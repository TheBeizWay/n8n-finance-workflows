const wf = require("../workflows/supplier-bill-checks.json");
const order = ["Sample bills (synthetic)", "Run five checks", "Summary"];
let items = [{ json: {} }];
for (const name of order) {
  const code = wf.nodes.find(n => n.name === name).parameters.jsCode;
  const $input = { all: () => items };
  items = new Function("$input", code)($input);
}
console.log(JSON.stringify(items[0].json, null, 2));
if (items[0].json.ready_total !== 5468 || items[0].json.held_total !== 26375) throw new Error("unexpected totals");
console.log("workflow code runs as exported");