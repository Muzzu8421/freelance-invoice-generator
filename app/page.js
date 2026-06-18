"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import generatePDF from "@/lib/generatePDF";

const initialInvoice = {
  invoiceNo: "INV-001",
  issueDate: "2026-06-18",
  dueDate: "2026-07-18",
  currency: "$",
  taxRate: 10,
  discount: 0,
  company: {
    name: "Your Company",
    email: "hello@yourcompany.com",
    phone: "",
    address: "",
  },
  client: {
    name: "Acme Corporation",
    email: "billing@acme.com",
    phone: "",
    address: "123 Business St\nSan Francisco, CA 94105",
  },
  notes: "Thank you for your business!",
  items: [
    {
      id: "item-1",
      description: "Web Development Services",
      quantity: 40,
      rate: 150,
    },
    {
      id: "item-2",
      description: "UI/UX Design",
      quantity: 20,
      rate: 120,
    },
  ],
};

export default function Page() {
  const [invoiceData, setInvoiceData] = useState(initialInvoice);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await generatePDF(previewRef.current, `${invoiceData.invoiceNo || "invoice"}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-group">
            <div className="flowdoc-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="brand-copy">
              <strong>Flowdoc</strong>
              <span>Invoice Generator</span>
            </div>
            <div className="brand-divider" aria-hidden="true" />
            <div className="hero-badge">
              <span />
              Built for Digital Heroes
            </div>
          </div>

          <button
            type="button"
            className="export-button"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download size={17} strokeWidth={2} />
            {isExporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="workspace-grid">
          <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
          <InvoicePreview invoiceData={invoiceData} previewRef={previewRef} />
        </div>
      </main>

      <footer className="site-footer">
        Flowdoc <span>·</span> Premium Invoice Generator
      </footer>
    </div>
  );
}
