import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTop from "@/components/scroll-to-top";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import TopSpace from "@/components/top-space";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "phimkhahay - Xem phim online miễn phí chất lượng cao",
  description:
    "phimkhahay là trang web xem phim online miễn phí, cập nhật phim mới nhất và dễ dàng tìm kiếm. Xem phim chất lượng cao với giao diện thân thiện và trải nghiệm mượt mà.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full overflow-y-auto",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#0369a1" />
          <Header />
          <TopSpace />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
