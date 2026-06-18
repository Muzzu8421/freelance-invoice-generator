"use client";

import { useRef, useState } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";

const createItem = () => ({
  id: crypto.randomUUID(),
  description: "Design work",
  quantity: 1,
  rate: 2500,
});

const initialInvoice = {
  invoiceNo: "INV-001",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  currency: "₹",
  taxRate: 18,
  discount: 0,
  company: {
    name: "Your Studio",
    email: "hello@yourstudio.com",
    phone: "+91 90000 00000",
    address: "Your company address line 1\nCity, State, PIN",
  },
  client: {
    name: "Client Name",
    email: "client@email.com",
    phone: "",
    address: "Client address line 1\nCity, State, PIN",
  },
  notes: "Thank you for your business.",
  items: [createItem()],
};

export default function Page() {
  const [invoiceData, setInvoiceData] = useState(initialInvoice);
  const previewRef = useRef(null);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Freelance Invoice Generator
          </p>
          <h1 className="text-2xl font-semibold md:text-4xl">
            Build invoices, preview live, export in one click
          </h1>
          <p className="max-w-2xl text-sm text-slate-400 md:text-base">
            Edit client details on the left and watch the invoice update on the
            right. The preview is the exact content that gets exported.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
          <InvoicePreview
            invoiceData={invoiceData}
            previewRef={previewRef}
          />
        </div>
      </div>
    </main>
  );
}