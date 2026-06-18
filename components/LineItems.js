"use client";

import { Plus, Trash2 } from "lucide-react";

const fieldClass =
  "grid min-w-0 gap-2 [&>span]:text-xs [&>span]:font-extrabold [&>span]:uppercase [&>span]:tracking-[0.08em] [&>span]:text-[#596576]";

const inputClass =
  "h-[47px] w-full rounded-[13px] border border-[#252d38] bg-[#0b1016] px-[15px] text-base font-medium text-[#f4f7fb] outline-none transition focus:border-[#4b7df3]/75 focus:ring-[3px] focus:ring-[#4b7df3]/10";

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
    <div className="grid gap-[15px]">
      {invoiceData.items.map((item, index) => (
        <div
          className="grid gap-3 rounded-[15px] border border-[#252d38] bg-[#11171e] p-3 sm:p-3.5"
          key={item.id}
        >
          <Field
            label="Description"
            value={item.description}
            onChange={(event) => updateItem(index, "description", event.target.value)}
          />
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px] items-end gap-2 sm:gap-2.5">
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
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item.description || "line item"}`}
              disabled={invoiceData.items.length === 1}
              className="inline-flex h-[47px] w-11 items-center justify-center rounded-[11px] border border-[#f45870]/25 bg-[#f45870]/10 text-[#e97788] transition hover:bg-[#f45870]/15 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-[11px] border border-[#315182] bg-[#13233b] px-3.5 text-[13px] font-bold text-[#7fa9f7] transition hover:bg-[#192e4c]"
      >
        <Plus size={16} />
        Add Item
      </button>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, min }) {
  return (
    <label className={fieldClass}>
      <span>{label}</span>
      <input
        className={inputClass}
        type={type}
        min={min}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
