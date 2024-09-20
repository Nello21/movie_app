import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/entities/reactQueryProvider";
import { ThemeProvider } from "@/entities/themeProvider";
import { Header } from "@/shared/header";
import "../globals.css";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кинолента",
  description: "Сайт для поиска и просмотра кино",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${nunito.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <main className="relative min-h-screen bg-netflix bg-cover bg-center bg-no-repeat bg-fixed">
              <Header />
              {children}
              {modal}
            </main>
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
