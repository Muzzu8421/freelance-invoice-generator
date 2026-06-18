"use client";

import LineItems from "./LineItems";

const fieldClass =
  "grid min-w-0 gap-2 text-left [&>span]:text-xs [&>span]:font-extrabold [&>span]:uppercase [&>span]:tracking-[0.08em] [&>span]:text-[#596576]";

const inputClass =
  "h-[47px] w-full rounded-[13px] border border-[#252d38] bg-[#0b1016] px-[15px] text-base font-medium text-[#f4f7fb] outline-none transition focus:border-[#4b7df3]/75 focus:ring-[3px] focus:ring-[#4b7df3]/10 disabled:opacity-60";

function updateNested(setInvoiceData, section, key, value) {
  setInvoiceData((previous) => ({
    ...previous,
    [section]: {
      ...previous[section],
      [key]: value,
    },
  }));
}

export default function InvoiceForm({ invoiceData, setInvoiceData }) {
  const updateTop = (key, value) => {
    setInvoiceData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <section className="overflow-hidden rounded-[19px] border border-[#2a323c] bg-[#151b22] shadow-[0_22px_55px_rgba(0,0,0,0.14)] sm:rounded-[25px] xl:h-[800px] print:hidden">
      <header className="flex h-[62px] items-center gap-2.5 border-b border-[#232b34] bg-white/[0.015] px-5 sm:px-7">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#45c7d8] shadow-[0_0_10px_rgba(69,199,216,0.8)]" />
        <h2 className="text-[15px] font-bold tracking-[-0.01em]">
          Invoice Details
        </h2>
      </header>

      <div className="overflow-visible xl:h-[calc(100%-62px)] xl:overflow-y-auto">
        <FormSection title="Invoice Information">
          <div className="grid gap-[15px] sm:grid-cols-2">
            <Field
              label="Invoice #"
              value={invoiceData.invoiceNo}
              onChange={(event) => updateTop("invoiceNo", event.target.value)}
            />
            <Field
              label="Issue Date"
              type="date"
              value={invoiceData.issueDate}
              onChange={(event) => updateTop("issueDate", event.target.value)}
            />
            <Field
              label="Due Date"
              type="date"
              value={invoiceData.dueDate}
              onChange={(event) => updateTop("dueDate", event.target.value)}
            />
          </div>
        </FormSection>

        <FormSection title="Your Company">
          <div className="grid gap-[15px]">
            <Field
              label="Company Name"
              value={invoiceData.company.name}
              onChange={(event) =>
                updateNested(setInvoiceData, "company", "name", event.target.value)
              }
            />
            <Field
              label="Email"
              type="email"
              value={invoiceData.company.email}
              onChange={(event) =>
                updateNested(setInvoiceData, "company", "email", event.target.value)
              }
            />
            <Field
              label="Phone"
              type="tel"
              value={invoiceData.company.phone}
              onChange={(event) =>
                updateNested(setInvoiceData, "company", "phone", event.target.value)
              }
            />
            <Textarea
              label="Address"
              value={invoiceData.company.address}
              onChange={(event) =>
                updateNested(setInvoiceData, "company", "address", event.target.value)
              }
            />
          </div>
        </FormSection>

        <FormSection title="Bill To">
          <div className="grid gap-[15px]">
            <Field
              label="Client Name"
              value={invoiceData.client.name}
              onChange={(event) =>
                updateNested(setInvoiceData, "client", "name", event.target.value)
              }
            />
            <Field
              label="Email"
              type="email"
              value={invoiceData.client.email}
              onChange={(event) =>
                updateNested(setInvoiceData, "client", "email", event.target.value)
              }
            />
            <Textarea
              label="Address"
              value={invoiceData.client.address}
              onChange={(event) =>
                updateNested(setInvoiceData, "client", "address", event.target.value)
              }
            />
            <Field
              label="Phone"
              type="tel"
              value={invoiceData.client.phone}
              onChange={(event) =>
                updateNested(setInvoiceData, "client", "phone", event.target.value)
              }
            />
          </div>
        </FormSection>

        <FormSection title="Line Items">
          <LineItems invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
        </FormSection>

        <FormSection title="Payment Details">
          <div className="grid gap-[15px] sm:grid-cols-3">
            <Field
              label="Currency"
              value={invoiceData.currency}
              onChange={(event) => updateTop("currency", event.target.value)}
            />
            <Field
              label="Tax %"
              type="number"
              min="0"
              value={invoiceData.taxRate}
              onChange={(event) => updateTop("taxRate", Number(event.target.value))}
            />
            <Field
              label="Discount"
              type="number"
              min="0"
              value={invoiceData.discount}
              onChange={(event) => updateTop("discount", Number(event.target.value))}
            />
          </div>
        </FormSection>

        <FormSection title="Notes" last>
          <Textarea
            label="Footer Note"
            value={invoiceData.notes}
            onChange={(event) => updateTop("notes", event.target.value)}
          />
        </FormSection>
      </div>
    </section>
  );
}

function FormSection({ title, children, last = false }) {
  return (
    <section
      className={`mx-5 py-6 sm:mx-7 sm:py-[26px] ${
        last ? "" : "border-b border-[#252c34]"
      }`}
    >
      <h3 className="mb-5 text-xs font-extrabold uppercase tracking-[0.1em] text-[#555f6e]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({ label, type = "text", value, onChange, min }) {
  return (
    <label className={fieldClass}>
      <span>{label}</span>
      <input
        className={`${inputClass} ${type === "date" ? "[color-scheme:dark]" : ""}`}
        type={type}
        min={min}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className={fieldClass}>
      <span>{label}</span>
      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        className="min-h-[82px] w-full resize-y rounded-[13px] border border-[#252d38] bg-[#0b1016] px-[15px] py-[13px] text-base font-medium leading-6 text-[#f4f7fb] outline-none transition focus:border-[#4b7df3]/75 focus:ring-[3px] focus:ring-[#4b7df3]/10"
      />
    </label>
  );
}
