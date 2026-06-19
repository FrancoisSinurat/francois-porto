import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Francois Novalentino Sinurat — Portfolio",
  description: "Back End Developer — Golang, APIs, and full stack systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth h-full" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
