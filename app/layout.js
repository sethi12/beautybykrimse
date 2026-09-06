import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ImageProtection from "@/components/ImageProtection";
import { siteConfig } from "@/lib/data";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://beautybykrimse.com"),
  title: {
    default: `${siteConfig.name} | Luxury Hair & Makeup Artist`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Luxury Hair & Makeup Services for Weddings, Special Events, Photoshoots & Celebrations. Timeless, elevated beauty tailored to your unique vision across Canada, GTA & Beyond.",
  keywords: [
    "Beauty By Krimse",
    "Toronto bridal makeup artist",
    "GTA bridal hair and makeup",
    "South Asian bridal makeup Toronto",
    "Western bridal makeup GTA",
    "Luxury bridal makeup artist",
    "Dupatta setting Toronto",
    "Bridal party services Toronto",
  ],
  authors: [{ name: "Beauty By Krimse" }],
  creator: "Beauty By Krimse",
  publisher: "Beauty By Krimse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteConfig.name} — Luxury Hair & Makeup Artist`,
    description:
      "Luxury Hair & Makeup Services for Weddings, Special Events, Photoshoots & Celebrations. Canada, GTA & Beyond.",
    url: "https://beautybykrimse.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "/mainimages/IMG_7657.jpg",
        width: 1200,
        height: 630,
        alt: "Beauty By Krimse Luxury Bridal Artistry",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('bbk-theme');
      if (saved === 'light' || saved === 'dark') {
        document.documentElement.setAttribute('data-theme', saved);
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased flex flex-col">
        <ThemeProvider>
          <ImageProtection />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
