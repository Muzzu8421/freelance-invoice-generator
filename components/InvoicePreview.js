"use client";

import generatePDF from "@/lib/generatePDF";
import { Download } from "lucide-react";

function calcTotals(data) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0),
    0
  );
  const tax = (subtotal * Number(data.taxRate || 0)) / 100;
  const discount = Number(data.discount || 0);
  const total = subtotal + tax - discount;
  return { subtotal, tax, discount, total };
}

function money(symbol, amount) {
  return `${symbol}${amount.toLocaleString("en-IN")}`;
}

export default function InvoicePreview({ invoiceData, previewRef }) {
  const { subtotal, tax, discount, total } = calcTotals(invoiceData);

  const handleDownload = async () => {
    await generatePDF(previewRef.current, `${invoiceData.invoiceNo}.pdf`);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Invoice Preview</h2>
          <p className="text-sm text-slate-400">Right panel live preview</p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-950/50 p-4 md:p-6">
        <div ref={previewRef} className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Invoice
              </p>
              <h3 className="mt-1 text-3xl font-bold">{invoiceData.invoiceNo}</h3>
              <p className="mt-2 text-sm text-slate-500">
                Issue Date: {invoiceData.issueDate || "-"} &nbsp;|&nbsp; Due Date:{" "}
                {invoiceData.dueDate || "-"}
              </p>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold">{invoiceData.company.name}</div>
              <p className="whitespace-pre-line text-sm text-slate-500">
                {invoiceData.company.address}
              </p>
              <p className="mt-2 text-sm text-slate-500">{invoiceData.company.email}</p>
              <p className="text-sm text-slate-500">{invoiceData.company.phone}</p>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <InfoCard title="Bill To">
              <div className="font-semibold">{invoiceData.client.name}</div>
              <p className="whitespace-pre-line text-sm text-slate-600">
                {invoiceData.client.address}
              </p>
              <p className="text-sm text-slate-600">{invoiceData.client.email}</p>
              <p className="text-sm text-slate-600">{invoiceData.client.phone}</p>
            </InfoCard>

            <InfoCard title="Invoice Summary">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-slate-500">Invoice No.</span>
                <span className="text-right font-medium">{invoiceData.invoiceNo}</span>
                <span className="text-slate-500">Currency</span>
                <span className="text-right font-medium">{invoiceData.currency}</span>
                <span className="text-slate-500">Tax %</span>
                <span className="text-right font-medium">{invoiceData.taxRate}%</span>
              </div>
            </InfoCard>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3 text-right">Rate</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => {
                  const amount = Number(item.quantity || 0) * Number(item.rate || 0);
                  return (
                    <tr key={item.id} className="border-t border-slate-200">
                      <td className="px-4 py-3">{item.description || "—"}</td>
                      <td className="px-4 py-3 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        {money(invoiceData.currency, Number(item.rate || 0))}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {money(invoiceData.currency, amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm space-y-2 rounded-2xl bg-slate-50 p-4">
              <Row label="Subtotal" value={money(invoiceData.currency, subtotal)} />
              <Row label={`Tax (${invoiceData.taxRate}%)`} value={money(invoiceData.currency, tax)} />
              <Row label="Discount" value={money(invoiceData.currency, discount)} />
              <div className="my-2 h-px bg-slate-200" />
              <Row
                label="Total"
                value={money(invoiceData.currency, total)}
                strong
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Notes
            </h4>
            <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
              {invoiceData.notes}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between text-sm ${strong ? "font-bold text-slate-900" : "text-slate-700"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}