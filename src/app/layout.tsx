import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://todo-list-app-ipton.vercel.app"),
  title: {
    default: "Tareas — Organiza tu día a día con simplicidad",
    template: "%s | Tareas",
  },
  description: "Una aplicación de lista de tareas minimalista, rápida y eficiente para organizar tus actividades cotidianas. Mantén la simplicidad en cada paso y optimiza tu productividad.",
  keywords: [
    "tareas",
    "lista de tareas",
    "todo list",
    "organizador",
    "productividad",
    "gestión del tiempo",
    "app de tareas",
    "minimalista",
    "nextjs",
    "react"
  ],
  authors: [{ name: "Ipton", url: "https://github.com/Iptonx" }],
  creator: "Ipton",
  publisher: "Ipton",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://todo-list-app-ipton.vercel.app",
    title: "Tareas — Organiza tu día a día con simplicidad",
    description: "Una aplicación de lista de tareas minimalista, rápida y eficiente para organizar tus actividades cotidianas. Mantén la simplicidad en cada paso y optimiza tu productividad.",
    siteName: "Tareas TodoList",
    images: [
      {
        url: "/globe.svg",
        width: 1200,
        height: 630,
        alt: "Tareas TodoList App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tareas — Organiza tu día a día con simplicidad",
    description: "Una aplicación de lista de tareas minimalista, rápida y eficiente para organizar tus actividades cotidianas. Mantén la simplicidad en cada paso y optimiza tu productividad.",
    creator: "@Ipton",
    images: ["/globe.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Tareas",
    "alternateName": "TodoList App",
    "url": "https://todo-list-app-ipton.vercel.app",
    "description": "Una aplicación de lista de tareas minimalista, rápida y eficiente para organizar tus actividades cotidianas.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "author": {
      "@type": "Person",
      "name": "Ipton",
      "url": "https://github.com/Iptonx"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
