"use client";

import { Plus, Trash2 } from "lucide-react";

const blankItem = () => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
});

export default function LineItems({ invoiceData, setInvoiceData }) {
  const items = invoiceData.items;

  const updateItem = (index, key, value) => {
    setInvoiceData((prev) => {
      const next = [...prev.items];
      next[index] = {
        ...next[index],
        [key]: key === "quantity" || key === "rate" ? Number(value) : value,
      };
      return { ...prev, items: next };
    });
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, blankItem()],
    }));
  };

  const removeItem = (index) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.length === 1 ? prev.items : prev.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 md:grid-cols-[1.6fr_0.5fr_0.7fr_auto]"
          >
            <input
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder="Description"
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm outline-none"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", e.target.value)}
              placeholder="Qty"
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm outline-none"
            />
            <input
              type="number"
              value={item.rate}
              onChange={(e) => updateItem(index, "rate", e.target.value)}
              placeholder="Rate"
              className="w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300 transition hover:bg-red-500/20"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
      >
        <Plus size={16} />
        Add Item
      </button>
    </div>
  );
}