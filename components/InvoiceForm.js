"use client";

import LineItems from "./LineItems";

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
    <section className="form-panel">
      <header className="panel-heading">
        <span className="status-dot status-dot-cyan" />
        <h2>Invoice Details</h2>
      </header>

      <div className="form-scroll">
        <FormSection title="Invoice Information">
          <div className="field-grid field-grid-two">
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
          <div className="field-grid">
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
          <div className="field-grid">
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
          <div className="field-grid field-grid-three">
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
    <section className={`form-section${last ? " form-section-last" : ""}`}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function Field({ label, type = "text", value, onChange, min }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} min={min} value={value} onChange={onChange} />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea rows={3} value={value} onChange={onChange} />
    </label>
  );
}
