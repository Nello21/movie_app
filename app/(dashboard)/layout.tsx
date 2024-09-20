import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/entities/themeProvider";
import ReactQueryProvider from "@/entities/reactQueryProvider";

export const metadata: Metadata = {
  title: "Админ панель",
  description: "Панель для управления сайтом",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {modal}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
