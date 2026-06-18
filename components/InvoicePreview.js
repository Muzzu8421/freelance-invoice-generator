"use client";

const eyebrowClass =
  "text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#c1cad6] sm:text-[11px]";

function calcTotals(data) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0),
    0,
  );
  const tax = (subtotal * Number(data.taxRate || 0)) / 100;
  const discount = Number(data.discount || 0);
  return {
    subtotal,
    tax,
    discount,
    total: subtotal + tax - discount,
  };
}

function money(symbol, amount) {
  return `${symbol}${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function InvoicePreview({ invoiceData, previewRef }) {
  const { subtotal, tax, discount, total } = calcTotals(invoiceData);

  return (
    <section className="min-w-0 rounded-[19px] border border-[#2a323c] bg-[#151b22] p-3.5 shadow-[0_22px_55px_rgba(0,0,0,0.14)] sm:rounded-[25px] sm:p-5 lg:p-[25px] xl:min-h-[914px] print:min-h-0 print:border-0 print:bg-white print:p-0 print:shadow-none">
      <header className="flex h-12 items-start justify-between sm:h-[50px] print:hidden">
        <div className="flex items-center gap-2 pt-1.5 sm:gap-[9px] sm:pt-[7px]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#45d66b] shadow-[0_0_10px_rgba(69,214,107,0.85)]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.11em] text-[#718097] sm:text-[13px]">
            Live Preview
          </h2>
        </div>
        <span className="inline-flex h-[29px] min-w-20 items-center justify-center rounded-[7px] border border-[#222a34] bg-[#0d1218] px-3 text-xs tracking-[0.05em] text-[#465469] sm:text-[13px]">
          {invoiceData.invoiceNo || "Invoice"}
        </span>
      </header>

      <article
        className="relative flex min-h-[720px] w-full min-w-0 flex-col overflow-hidden rounded-[15px] bg-white text-[#0b1119] sm:min-h-[810px] print:min-h-0 print:rounded-none"
        ref={previewRef}
      >
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[linear-gradient(90deg,#3378ef_0%,#6478ec_56%,#43c363_100%)]" />

        <header className="grid grid-cols-1 gap-x-10 gap-y-7 px-5 pt-9 pb-8 sm:grid-cols-2 sm:px-8 sm:pt-11 sm:pb-10 lg:gap-x-[70px] lg:gap-y-[33px] lg:px-[50px] lg:pb-[47px]">
          <div>
            <h3 className="text-[22px] font-extrabold tracking-[-0.045em] text-[#4a79ef] sm:text-[27px]">
              {invoiceData.company.name || "Your Company"}
            </h3>
            <p className="mt-1.5 break-all text-xs text-[#8a96a8] sm:mt-[7px] sm:text-sm">
              {invoiceData.company.email}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <h1 className="text-[27px] font-black uppercase tracking-[-0.05em] sm:text-[32px]">
              Invoice
            </h1>
            <p className="mt-0.5 text-sm font-bold text-[#3473f1] sm:text-[15px]">
              #{invoiceData.invoiceNo || "—"}
            </p>
          </div>

          <ContactBlock title="From" data={invoiceData.company} />
          <ContactBlock title="Bill To" data={invoiceData.client} />
        </header>

        <div className="grid grid-cols-1 gap-4 border-y border-[#e1e7ee] bg-[#f4f7fa] px-5 py-[18px] min-[420px]:grid-cols-2 sm:gap-10 sm:px-8 sm:py-5 lg:gap-[70px] lg:px-[50px]">
          <DateBlock label="Invoice Date" value={formatDate(invoiceData.issueDate)} />
          <DateBlock label="Due Date" value={formatDate(invoiceData.dueDate)} />
        </div>

        <div className="flex-1 px-5 py-5 sm:px-8 sm:py-[26px] lg:px-[50px] lg:pb-7">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[560px] table-fixed border-collapse text-left">
              <thead>
                <tr>
                  <th className={`${eyebrowClass} w-[52%] pb-[13px]`}>
                    Description
                  </th>
                  <th className={`${eyebrowClass} w-[13%] pb-[13px] text-right`}>
                    Qty
                  </th>
                  <th className={`${eyebrowClass} w-[17%] pb-[13px] text-right`}>
                    Rate
                  </th>
                  <th className={`${eyebrowClass} w-[18%] pb-[13px] text-right`}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => {
                  const amount = Number(item.quantity || 0) * Number(item.rate || 0);
                  return (
                    <tr key={item.id}>
                      <td className="border-t border-[#e4e9ef] py-[15px] pr-3 text-sm sm:text-base">
                        {item.description || "—"}
                      </td>
                      <td className="border-t border-[#e4e9ef] py-[15px] text-right text-sm text-[#657284] sm:text-base">
                        {item.quantity}
                      </td>
                      <td className="border-t border-[#e4e9ef] py-[15px] text-right text-sm text-[#657284] sm:text-base">
                        {money(invoiceData.currency, item.rate)}
                      </td>
                      <td className="border-t border-[#e4e9ef] py-[15px] text-right text-sm font-bold sm:text-base">
                        {money(invoiceData.currency, amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-[15px] ml-auto w-full max-w-[280px]">
            <TotalRow
              label="Subtotal"
              value={money(invoiceData.currency, subtotal)}
            />
            <TotalRow
              label={`Tax (${invoiceData.taxRate || 0}%)`}
              value={money(invoiceData.currency, tax)}
            />
            {discount > 0 && (
              <TotalRow
                label="Discount"
                value={`-${money(invoiceData.currency, discount)}`}
              />
            )}
            <div className="mt-2.5 flex items-center justify-between border-t border-[#dbe2e9] pt-[15px]">
              <strong className="text-sm sm:text-[15px]">Total Due</strong>
              <span className="text-[22px] font-extrabold tracking-[-0.04em] text-[#4d7bf2] sm:text-[26px]">
                {money(invoiceData.currency, total)}
              </span>
            </div>
          </div>
        </div>

        <footer className="min-h-[101px] border-t border-[#e0e6ed] bg-[#f4f7fa] px-5 py-5 sm:px-8 lg:px-[50px]">
          <strong className={eyebrowClass}>Notes</strong>
          <p className="mt-2.5 whitespace-pre-line text-xs leading-5 text-[#697689] sm:text-sm">
            {invoiceData.notes || "Thank you for your business!"}
          </p>
        </footer>
      </article>
    </section>
  );
}

function ContactBlock({ title, data }) {
  return (
    <section className="min-h-0 sm:min-h-[102px]">
      <h4 className={eyebrowClass}>{title}</h4>
      <strong className="mt-2.5 block text-sm leading-tight sm:mt-3 sm:text-base">
        {data.name || "—"}
      </strong>
      {data.email && (
        <a
          className="mt-1 block break-all text-xs leading-snug text-[#3473f1] no-underline sm:text-sm"
          href={`mailto:${data.email}`}
        >
          {data.email}
        </a>
      )}
      {data.phone && (
        <p className="mt-1 text-xs leading-snug text-[#3473f1] sm:text-sm">
          {data.phone}
        </p>
      )}
      {data.address && (
        <p className="mt-1 max-w-[250px] whitespace-pre-line text-xs leading-snug text-[#667385] sm:text-sm">
          {data.address}
        </p>
      )}
    </section>
  );
}

function DateBlock({ label, value }) {
  return (
    <div className="grid gap-1.5 sm:gap-2">
      <span className={eyebrowClass}>{label}</span>
      <strong className="text-sm sm:text-[15px]">{value}</strong>
    </div>
  );
}

function TotalRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1 text-xs sm:text-sm">
      <span className="text-[#8490a1]">{label}</span>
      <strong className="font-semibold text-[#111820]">{value}</strong>
    </div>
  );
}
