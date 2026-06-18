"use client";

import LineItems from "./LineItems";

function updateNested(setInvoiceData, section, key, value) {
  setInvoiceData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value,
    },
  }));
}

export default function InvoiceForm({ invoiceData, setInvoiceData }) {
  const updateTop = (key, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Invoice Form</h2>
          <p className="text-sm text-slate-400">All editable fields live here</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          Left panel
        </span>
      </div>

      <div className="space-y-6 overflow-y-auto pr-1">
        <Section title="Invoice Info">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Invoice No."
              value={invoiceData.invoiceNo}
              onChange={(e) => updateTop("invoiceNo", e.target.value)}
            />
            <Field
              label="Issue Date"
              type="date"
              value={invoiceData.issueDate}
              onChange={(e) => updateTop("issueDate", e.target.value)}
            />
            <Field
              label="Due Date"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => updateTop("dueDate", e.target.value)}
            />
            <Field
              label="Currency"
              value={invoiceData.currency}
              onChange={(e) => updateTop("currency", e.target.value)}
            />
            <Field
              label="Tax %"
              type="number"
              value={invoiceData.taxRate}
              onChange={(e) => updateTop("taxRate", Number(e.target.value))}
            />
            <Field
              label="Discount"
              type="number"
              value={invoiceData.discount}
              onChange={(e) => updateTop("discount", Number(e.target.value))}
            />
          </div>
        </Section>

        <Section title="Company Details">
          <div className="grid gap-4">
            <Field
              label="Company Name"
              value={invoiceData.company.name}
              onChange={(e) =>
                updateNested(setInvoiceData, "company", "name", e.target.value)
              }
            />
            <Field
              label="Email"
              value={invoiceData.company.email}
              onChange={(e) =>
                updateNested(setInvoiceData, "company", "email", e.target.value)
              }
            />
            <Field
              label="Phone"
              value={invoiceData.company.phone}
              onChange={(e) =>
                updateNested(setInvoiceData, "company", "phone", e.target.value)
              }
            />
            <Textarea
              label="Address"
              value={invoiceData.company.address}
              onChange={(e) =>
                updateNested(setInvoiceData, "company", "address", e.target.value)
              }
            />
          </div>
        </Section>

        <Section title="Client Details">
          <div className="grid gap-4">
            <Field
              label="Client Name"
              value={invoiceData.client.name}
              onChange={(e) =>
                updateNested(setInvoiceData, "client", "name", e.target.value)
              }
            />
            <Field
              label="Email"
              value={invoiceData.client.email}
              onChange={(e) =>
                updateNested(setInvoiceData, "client", "email", e.target.value)
              }
            />
            <Field
              label="Phone"
              value={invoiceData.client.phone}
              onChange={(e) =>
                updateNested(setInvoiceData, "client", "phone", e.target.value)
              }
            />
            <Textarea
              label="Address"
              value={invoiceData.client.address}
              onChange={(e) =>
                updateNested(setInvoiceData, "client", "address", e.target.value)
              }
            />
          </div>
        </Section>

        <Section title="Line Items">
          <LineItems invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
        </Section>

        <Section title="Notes">
          <Textarea
            label="Footer note"
            value={invoiceData.notes}
            onChange={(e) => updateTop("notes", e.target.value)}
          />
        </Section>
      </div>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, type = "text", value, onChange }) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/30 focus:bg-white/10"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-slate-300">{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/30 focus:bg-white/10"
      />
    </label>
  );
}