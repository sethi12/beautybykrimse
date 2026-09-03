import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
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
    default: `${siteConfig.name} | Luxury Bridal Hair & Makeup Artist Toronto & GTA`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Toronto & GTA luxury bridal hair and makeup artist specializing in bespoke South Asian and Western bridal transformations, dupatta draping, jewelry setting, and editorial event glam.",
  keywords: [
    "Toronto bridal makeup artist",
    "GTA bridal hair and makeup",
    "South Asian bridal makeup Toronto",
    "Indian wedding makeup artist GTA",
    "Brampton bridal makeup",
    "Mississauga bridal hair",
    "Vaughan bridal beauty",
    "Luxury bridal makeup artist",
    "Dupatta setting Toronto",
    "Western bridal makeup GTA",
    "BeautyByKrimse",
    "Bridal party makeup Toronto",
  ],
  authors: [{ name: "BeautyByKrimse" }],
  creator: "BeautyByKrimse",
  publisher: "BeautyByKrimse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteConfig.name} — Luxury Bridal Hair & Makeup Toronto`,
    description:
      "Timeless luxury and bespoke bridal artistry tailored to your unique essence across Toronto, GTA, and destination weddings.",
    url: "https://beautybykrimse.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "/mainimages/IMG_7657.jpg",
        width: 1200,
        height: 630,
        alt: "BeautyByKrimse Luxury Bridal Artistry",
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
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
