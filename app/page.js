"use client";

import Image from "next/image";
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
    <div className="min-h-screen bg-[#0b1016] bg-[radial-gradient(circle_at_52%_0%,rgba(41,75,150,0.12),transparent_34%)] print:bg-white">
      <header className="h-[70px] border-b border-[#252c34] bg-[#0a0f15]/95 print:hidden">
        <div className="mx-auto flex h-full w-full max-w-[1656px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-6">
          <div className="flex min-w-0 items-center">
            <Image
              src="/favicon.ico"
              alt="Flowdoc"
              width={48}
              height={30}
              priority
              unoptimized
              className="mr-2.5 h-[30px] w-12 shrink-0 object-contain sm:mr-3.5"
            />

            <div className="flex min-w-0 flex-col leading-none">
              <strong className="truncate text-base font-bold tracking-[-0.02em] sm:text-lg">
                Flowdoc
              </strong>
              <span className="mt-1 hidden text-[13px] tracking-[0.01em] text-[#505a68] sm:block">
                Invoice Generator
              </span>
            </div>

            <div
              aria-hidden="true"
              className="mx-5 hidden h-7 w-px bg-[#2c343e] md:block"
            />

            <div className="hidden h-[29px] items-center gap-2 whitespace-nowrap rounded-full border border-[#23466e] bg-[#0c1929] px-3 text-[13px] font-semibold text-[#6f99cd] md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34c39a] shadow-[0_0_10px_rgba(52,195,154,0.75)]" />
              Built for Digital Heroes
            </div>
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#6a88ff]/45 bg-[linear-gradient(135deg,#3478e8_0%,#5560e9_100%)] px-3 text-[13px] font-bold text-white shadow-[0_9px_25px_rgba(53,103,224,0.26),inset_0_1px_0_rgba(255,255,255,0.16)] transition hover:-translate-y-px hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-75 sm:h-11 sm:min-w-[154px] sm:px-5 sm:text-[15px]"
          >
            <Download size={17} strokeWidth={2} />
            <span className="hidden sm:inline">
              {isExporting ? "Exporting..." : "Export PDF"}
            </span>
            <span className="sm:hidden">{isExporting ? "..." : "PDF"}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1656px] px-3 py-5 sm:px-5 sm:py-7 lg:px-6 lg:py-[35px] print:max-w-none print:p-0">
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(400px,526px)_minmax(0,1fr)] print:block">
          <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
          <InvoicePreview invoiceData={invoiceData} previewRef={previewRef} />
        </div>
      </main>

      <footer className="flex min-h-[77px] items-center justify-center gap-1 border-t border-[#151b22] px-4 text-center text-sm text-[#252d37] print:hidden">
        Flowdoc <span>·</span> Premium Invoice Generator
      </footer>
    </div>
  );
}
