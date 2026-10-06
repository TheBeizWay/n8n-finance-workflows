# n8n finance workflows

Small, practical n8n workflows for Australian small-business finance, built so a person signs off on anything that matters. All sample data is made up.

Built by [Beiz Data & Accounting](https://beiz.com.au), led by an Australian Chartered Accountant.

## Supplier bill checks

[`workflows/supplier-bill-checks.json`](workflows/supplier-bill-checks.json)

Runs five checks on every supplier bill and sorts them into **ready to pay**, **held for a person** or **review**, each with the reason. Nothing is paid automatically.

| Check | Rule (default) | Result |
|---|---|---|
| Already paid? | Same supplier and invoice number, or same amount within 30 days | Held |
| Bank details changed? | Bank account on the bill differs from the one on file | Held: phone the supplier on a number you already have |
| Over the approval limit? | Amount above $10,000 | Held: needs a second approver |
| New supplier? | Supplier not in your supplier list | Held: check ABN and that someone ordered it |
| Price moved? | Unit price more than 10% above the last order | Review |

With the sample data (eight bills from a fictional joinery business) the result is 4 bills, $5,468, ready for approval and 4 bills, $26,375, held with reasons. It's the same scenario as the [live demo on beiz.com.au](https://beiz.com.au/try/#bills).

### How it's built

```
Manual trigger → Sample bills (synthetic) → Run five checks → Summary
```

Four nodes, no credentials needed to try it. The checks are plain JavaScript in one Code node, so you can read every rule.

### Try it

1. In n8n, choose **Import from file** and pick `supplier-bill-checks.json`.
2. Click **Test workflow**. The Summary node shows the ready and held totals and a message you could send by email or Teams.

### Use it on real bills

- Replace **Sample bills** with your accounting system's bills, for example the Xero node (*Get many invoices*, type `ACCPAY`, status `AUTHORISED`), mapped to `invoice`, `supplier`, `date`, `amount`, `unit_price` and `bank_account`.
- Replace the supplier list in **Run five checks** with your own contacts, or a sheet you control.
- Add a schedule trigger (say 7am weekdays) and send the Summary message to whoever approves payments.
- Keep approval in your accounting system. This workflow sorts bills; it never pays them.

### Caveats

- It won't catch a fake bill from a real supplier with unchanged details and a normal price. That still needs someone who knows what was ordered.
- Rules are only as good as your supplier records. Clean them up first.
- Real bank details and invoices are personal and financial information. Run it in your own n8n instance and accounts, and don't paste live data into free AI tools.

## Tests

```
node test/run.js       # the five checks against the sample data
node test/emulate.js   # runs the exported workflow's Code nodes end to end
```

## Licence

MIT. Use it, change it, and keep a person in the loop.
