// Synthetic data for a made-up joinery business. Not real suppliers or accounts.
const suppliers = [
  { supplier: "Timber Co", bank_account: "BSB 000-001 ACC 11111111", last_unit_price: 42.80 },
  { supplier: "Fixings Direct", bank_account: "BSB 000-002 ACC 22222222", last_unit_price: 6.70 },
  { supplier: "Harbour Electrical", bank_account: "BSB 000-003 ACC 33333333", last_unit_price: null },
  { supplier: "Coastal Plumbing", bank_account: "BSB 000-004 ACC 44444444", last_unit_price: null },
  { supplier: "Office Supplies AU", bank_account: "BSB 000-005 ACC 55555555", last_unit_price: null },
  { supplier: "Waste Services", bank_account: "BSB 000-006 ACC 66666666", last_unit_price: null },
];
const bills = [
  { invoice: "INV-2201", supplier: "Timber Co", date: "2026-10-01", amount: 4280, unit_price: 42.80, bank_account: "BSB 000-001 ACC 11111111" },
  { invoice: "INV-2202", supplier: "Fixings Direct", date: "2026-10-01", amount: 612, unit_price: 6.80, bank_account: "BSB 000-002 ACC 22222222" },
  { invoice: "INV-2203", supplier: "Harbour Electrical", date: "2026-10-02", amount: 18400, unit_price: null, bank_account: "BSB 000-003 ACC 33333333" },
  { invoice: "INV-2204", supplier: "Timber Co", date: "2026-10-03", amount: 4280, unit_price: 42.80, bank_account: "BSB 000-001 ACC 11111111" },
  { invoice: "INV-2205", supplier: "Coastal Plumbing", date: "2026-10-03", amount: 2950, unit_price: null, bank_account: "BSB 000-009 ACC 99999999" },
  { invoice: "INV-2206", supplier: "Office Supplies AU", date: "2026-10-04", amount: 186, unit_price: null, bank_account: "BSB 000-005 ACC 55555555" },
  { invoice: "INV-2207", supplier: "Fixings Direct", date: "2026-10-04", amount: 745, unit_price: 7.45, bank_account: "BSB 000-002 ACC 22222222" },
  { invoice: "INV-2208", supplier: "Waste Services", date: "2026-10-05", amount: 390, unit_price: null, bank_account: "BSB 000-006 ACC 66666666" },
];
module.exports = { suppliers, bills };
