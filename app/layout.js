import "./globals.css";

export const metadata = {
  title: "Freelance Invoice Generator",
  description: "Live invoice editor with preview and PDF download",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}