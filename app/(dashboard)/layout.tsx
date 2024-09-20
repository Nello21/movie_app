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
}: {
  children: React.ReactNode;
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
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
