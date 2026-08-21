import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ConsoleProvider } from "../lib/ConsoleContext";
import { Toast } from "../components/Toast";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MSL Products — Sovereign DeepTech Platform",
  description: "India's sovereign infrastructure for deeptech workloads, zero egress fees, local residency, and native compliance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <div className="grid-bg"></div>
        <div className="glow"></div>
        <ConsoleProvider>
          {children}
          <Toast />
        </ConsoleProvider>
      </body>
    </html>
  );
}
