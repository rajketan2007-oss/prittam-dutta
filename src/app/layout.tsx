import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { MotionProvider } from "@/context/MotionContext";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Cursor } from "@/components/common/Cursor";
import { GrainOverlay } from "@/components/common/GrainOverlay";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { SITE_CONTENT } from "@/data/content";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: SITE_CONTENT.seo.title,
  description: SITE_CONTENT.seo.description,
  keywords: SITE_CONTENT.seo.keywords,
  authors: [{ name: SITE_CONTENT.seo.author }],
  creator: SITE_CONTENT.seo.author,
  metadataBase: new URL(SITE_CONTENT.seo.siteUrl),
  openGraph: {
    type: "website",
    locale: SITE_CONTENT.seo.locale,
    url: SITE_CONTENT.seo.siteUrl,
    title: SITE_CONTENT.seo.title,
    description: SITE_CONTENT.seo.openGraphDescription,
    siteName: "Pritam Dutta Portfolio",
    images: [
      {
        url: "/images/bellebirds-team-certificate.jpg",
        width: 1200,
        height: 630,
        alt: "Pritam Dutta - Entrepreneur & Founder of Cyption",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONTENT.seo.title,
    description: SITE_CONTENT.seo.openGraphDescription,
    images: ["/images/bellebirds-team-certificate.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pritam Dutta",
    url: SITE_CONTENT.seo.siteUrl,
    jobTitle: "Entrepreneur, Founder & Digital Marketing Strategist",
    knowsAbout: [
      "Digital Marketing",
      "Performance Marketing",
      "SEO",
      "AI Automation",
      "Entrepreneurship",
      "Brand Strategy",
    ],
    founder: [
      {
        "@type": "Organization",
        name: "Cyption",
        url: "https://cyption.com",
      },
      {
        "@type": "Organization",
        name: "Offroute",
        url: "https://www.instagram.com/offroutetourandtravels/",
      },
      {
        "@type": "Organization",
        name: "Course to Excellence",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durgapur",
      addressRegion: "West Bengal",
      addressCountry: "India",
    },
  };

  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload and Link Fontshare Boska & Satoshi Typography */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=boska@400,500,700,400i&f[]=satoshi@400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=boska@400,500,700,400i&f[]=satoshi@400,500,700&display=swap"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#C9A24B] selection:text-black">
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>
              <ScrollProgress />
              <GrainOverlay />
              <Cursor />
              {children}
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
