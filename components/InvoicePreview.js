"use client";

function calcTotals(data) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0),
    0,
  );
  const tax = (subtotal * Number(data.taxRate || 0)) / 100;
  const discount = Number(data.discount || 0);
  return {
    subtotal,
    tax,
    discount,
    total: subtotal + tax - discount,
  };
}

function money(symbol, amount) {
  return `${symbol}${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function InvoicePreview({ invoiceData, previewRef }) {
  const { subtotal, tax, discount, total } = calcTotals(invoiceData);

  return (
    <section className="preview-panel">
      <header className="preview-toolbar">
        <div className="live-preview-label">
          <span className="status-dot status-dot-green" />
          <h2>Live Preview</h2>
        </div>
        <span className="invoice-chip">{invoiceData.invoiceNo || "Invoice"}</span>
      </header>

      <div className="invoice-paper-scroll">
        <article className="invoice-paper print-area" ref={previewRef}>
          <div className="invoice-accent" />

          <header className="invoice-header">
            <div className="invoice-brand">
              <h3>{invoiceData.company.name || "Your Company"}</h3>
              <p>{invoiceData.company.email}</p>
            </div>
            <div className="invoice-title">
              <h1>Invoice</h1>
              <p>#{invoiceData.invoiceNo || "—"}</p>
            </div>

            <ContactBlock title="From" data={invoiceData.company} />
            <ContactBlock title="Bill To" data={invoiceData.client} />
          </header>

          <div className="invoice-date-band">
            <DateBlock label="Invoice Date" value={formatDate(invoiceData.issueDate)} />
            <DateBlock label="Due Date" value={formatDate(invoiceData.dueDate)} />
          </div>

          <div className="invoice-body">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="numeric-cell">Qty</th>
                  <th className="numeric-cell">Rate</th>
                  <th className="numeric-cell">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => {
                  const amount = Number(item.quantity || 0) * Number(item.rate || 0);
                  return (
                    <tr key={item.id}>
                      <td>{item.description || "—"}</td>
                      <td className="numeric-cell muted-cell">{item.quantity}</td>
                      <td className="numeric-cell muted-cell">
                        {money(invoiceData.currency, item.rate)}
                      </td>
                      <td className="numeric-cell amount-cell">
                        {money(invoiceData.currency, amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="invoice-totals">
              <TotalRow
                label="Subtotal"
                value={money(invoiceData.currency, subtotal)}
              />
              <TotalRow
                label={`Tax (${invoiceData.taxRate || 0}%)`}
                value={money(invoiceData.currency, tax)}
              />
              {discount > 0 && (
                <TotalRow
                  label="Discount"
                  value={`-${money(invoiceData.currency, discount)}`}
                />
              )}
              <div className="total-due-row">
                <strong>Total Due</strong>
                <span>{money(invoiceData.currency, total)}</span>
              </div>
            </div>
          </div>

          <footer className="invoice-notes">
            <strong>Notes</strong>
            <p>{invoiceData.notes || "Thank you for your business!"}</p>
          </footer>
        </article>
      </div>
    </section>
  );
}

function ContactBlock({ title, data }) {
  return (
    <section className="contact-block">
      <h4>{title}</h4>
      <strong>{data.name || "—"}</strong>
      {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
      {data.phone && <p>{data.phone}</p>}
      {data.address && <p className="contact-address">{data.address}</p>}
    </section>
  );
}

function DateBlock({ label, value }) {
  return (
    <div className="date-block">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TotalRow({ label, value }) {
  return (
    <div className="total-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
