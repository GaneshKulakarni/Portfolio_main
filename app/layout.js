import { Space_Grotesk, Manrope, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Ganesh Kulkarni | Full Stack Developer & UI Architect",
  description:
    "Crafting immersive digital experiences through clean code and cinematic design. Full Stack Developer specializing in React, Node.js, and high-fidelity interfaces.",
  keywords: [
    "Full Stack Developer",
    "React Engineer",
    "UI Architect",
    "Portfolio",
    "Ganesh Kulkarni",
  ],
  openGraph: {
    title: "Ganesh Kulkarni | Full Stack Developer",
    description:
      "Crafting immersive digital experiences through clean code and cinematic design.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable} dark`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-[family-name:var(--font-body)] selection:bg-primary/30 overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
