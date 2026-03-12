import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechRevive | Servicio Técnico Profesional de Computadoras",
  description:
    "Reparación, mantenimiento y actualización de PCs y laptops en Caracas. Diagnóstico gratuito, garantía de 3 meses y entrega en 24–48h. Técnicos certificados.",
  keywords: "servicio técnico, reparación de computadoras, mantenimiento pc, laptop, Caracas, Venezuela",
  openGraph: {
    title: "TechRevive | Servicio Técnico Profesional",
    description: "Diagnóstico gratuito · Garantía 3 meses · Entrega en 24-48h",
    type: "website",
    locale: "es_VE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}><StackProvider app={stackClientApp}><StackTheme>
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
