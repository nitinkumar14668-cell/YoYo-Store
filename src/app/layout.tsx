import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import { StoreProvider } from "../context/StoreContext";
import { Navbar } from "../components/ui/Navbar";
import "../index.css";

export const metadata: Metadata = {
  title: "Yoyo Store",
  description: "Premium App Store implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
        <ThemeProvider defaultTheme="dark">
          <StoreProvider>
            <Navbar />
            <main>{children}</main>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
