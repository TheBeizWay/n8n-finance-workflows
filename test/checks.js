// Shared logic for the "Run five checks" Code node. Kept here so it can be tested outside n8n.
function runChecks(bills, suppliers, opts = {}) {
  const LIMIT = opts.approvalLimit ?? 10000;      // dollars; bills above this need a second approver
  const PRICE_JUMP = opts.priceJump ?? 0.10;       // flag unit price rises above 10% on the last order
  const DUP_DAYS = opts.duplicateWindowDays ?? 30; // same supplier + amount within this many days
  const bySupplier = Object.fromEntries(suppliers.map(s => [s.supplier, s]));
  const day = d => new Date(d + "T00:00:00Z").getTime() / 864e5;
  return bills.map((b, i) => {
    const reasons = [], review = [];
    const s = bySupplier[b.supplier];
    if (!s) reasons.push("New supplier: check ABN and that someone ordered this");
    if (s && b.bank_account !== s.bank_account) reasons.push("Bank details differ from the ones on file: phone the supplier on a number you already have");
    if (b.amount > LIMIT) reasons.push(`Over the $${LIMIT.toLocaleString("en-AU")} approval limit: needs a second approver`);
    const dup = bills.find((o, j) => j !== i && o.supplier === b.supplier &&
      (o.invoice === b.invoice || (o.amount === b.amount && Math.abs(day(o.date) - day(b.date)) <= DUP_DAYS)));
    if (dup && bills.indexOf(dup) < i) reasons.push(`Possible duplicate of ${dup.invoice}`);
    if (s && s.last_unit_price && b.unit_price && b.unit_price > s.last_unit_price * (1 + PRICE_JUMP))
      review.push(`Unit price up ${Math.round((b.unit_price / s.last_unit_price - 1) * 100)}% on the last order`);
    const status = reasons.length ? "Held" : review.length ? "Review" : "Ready to pay";
    return { ...b, status, reasons: [...reasons, ...review].join("; ") };
  });
}
module.exports = { runChecks };
