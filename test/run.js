const assert = require("assert");
const { runChecks } = require("./checks");
const { suppliers, bills } = require("./sample");
const out = runChecks(bills, suppliers);
for (const r of out) console.log(r.invoice.padEnd(9), r.status.padEnd(13), r.reasons);
const st = Object.fromEntries(out.map(r => [r.invoice, r.status]));
assert.deepStrictEqual(st, { "INV-2201": "Ready to pay", "INV-2202": "Ready to pay", "INV-2203": "Held", "INV-2204": "Held",
  "INV-2205": "Held", "INV-2206": "Ready to pay", "INV-2207": "Review", "INV-2208": "Ready to pay" });
const sum = s => out.filter(r => r.status === s).reduce((a, r) => a + r.amount, 0);
console.log("ready", sum("Ready to pay"), "held+review", sum("Held") + sum("Review"));
assert.strictEqual(runChecks([{ ...bills[0], supplier: "Unknown Pty Ltd" }], suppliers)[0].status, "Held"); // new supplier
console.log("all tests passed");
