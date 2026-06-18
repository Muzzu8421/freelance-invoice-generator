import "./globals.css";

export const metadata = {
  title: "Freelance Invoice Generator",
  description: "Live invoice editor with preview and PDF download",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-w-80 bg-[#0b1016]">
      <body className="min-h-screen bg-[#0b1016] font-sans text-[#f7f9fc] antialiased print:bg-white">
        {children}
      </body>
    </html>
  );
}
