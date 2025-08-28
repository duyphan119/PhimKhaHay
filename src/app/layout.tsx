import Footer from "@/components/footer";
import Header from "@/components/header";
import CommonDataProvider from "@/components/providers/common-data-provider";
import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTop from "@/components/scroll-to-top";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "PhimKhaHay",
  description: "PhimKhaHay - Web xem phim miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <CommonDataProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "flex flex-col min-h-screen antialiased",
              rubik.className,
              rubik.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader color="hsl(var(--primary))" />
              <Header />
              <main className="flex-1 _bg-layout">
                <div className="_container _bg-container space-y-4 sm:space-y-6 md:space-y-8 py-4 sm:py-6 md:py-8">
                  <p className="_bg-layout font-medium text-xs text-yellow-600 text-center px-4 py-2">
                    KHI NỘI DUNG KHÔNG HIỂN THỊ, HÃY THỬ BẤM F5 HOẶC TẢI LẠI
                    TRANG VÀI LẦN NHÉ.
                  </p>
                  {children}
                </div>
              </main>
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </body>
        </html>
      </CommonDataProvider>
    </QueryProvider>
  );
}
