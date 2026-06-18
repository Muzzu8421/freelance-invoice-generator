"use client";

import { Plus, Trash2 } from "lucide-react";

const blankItem = () => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
});

export default function LineItems({ invoiceData, setInvoiceData }) {
  const updateItem = (index, key, value) => {
    setInvoiceData((previous) => {
      const items = [...previous.items];
      items[index] = {
        ...items[index],
        [key]: key === "quantity" || key === "rate" ? Number(value) : value,
      };
      return { ...previous, items };
    });
  };

  const addItem = () => {
    setInvoiceData((previous) => ({
      ...previous,
      items: [...previous.items, blankItem()],
    }));
  };

  const removeItem = (index) => {
    setInvoiceData((previous) => ({
      ...previous,
      items:
        previous.items.length === 1
          ? previous.items
          : previous.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  return (
    <div className="line-items-editor">
      {invoiceData.items.map((item, index) => (
        <div className="line-item-editor" key={item.id}>
          <Field
            label="Description"
            value={item.description}
            onChange={(event) => updateItem(index, "description", event.target.value)}
          />
          <div className="line-item-numbers">
            <Field
              label="Qty"
              type="number"
              min="0"
              value={item.quantity}
              onChange={(event) => updateItem(index, "quantity", event.target.value)}
            />
            <Field
              label="Rate"
              type="number"
              min="0"
              value={item.rate}
              onChange={(event) => updateItem(index, "rate", event.target.value)}
            />
            <button
              type="button"
              className="remove-item-button"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item.description || "line item"}`}
              disabled={invoiceData.items.length === 1}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="add-item-button" onClick={addItem}>
        <Plus size={16} />
        Add Item
      </button>
    </div>
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
